import { Error, Document, Schema, Callback, CallbackError, CallbackWithoutResultAndOptionalError } from "mongoose";
import { ErrorData } from '../../utils/errorResponse'

export interface ValidatorError extends Error {
    data: ErrorData[];
}

function getArrayFromString(str: string): string[] | null {
    try {
        const json = JSON.parse(str);
        return Array.isArray(json) ? json : null;
    } catch (err) {
        return null;
    }
}

export function validatorErrorHandler(schema: Schema, uniqueMessage?: string) {
    const defaultMessage = `{key} already exist`;
    const message = uniqueMessage || defaultMessage;

    schema.post('save', async function(error: any, doc: Document, next: CallbackWithoutResultAndOptionalError) {
        if (error){
            const validatorError: ValidatorError = error;
            validatorError.data = [];
            // Handle unique validator
            if (error.code === 11000) {
                for (const key in error.keyValue) {
                    validatorError.data.push({error: key, message: message.replace('{key}', key)});
                }
            // Handle validator
            } else {
                for (const [key, value] of Object.entries<any>(error.errors)) {
                    const errorsArray = getArrayFromString(value);
                    if (errorsArray) {
                        errorsArray.forEach((err: string) => {
                            validatorError.data.push({error: key, message: err});
                        });
                    } else {
                        validatorError.data.push({error: key, message: value.message});
                    }
                }
            }
            return next(validatorError);
        }
        return next();
    })
}
