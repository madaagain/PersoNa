export interface ErrorData {
    error: string;
    message: string;
}

export class ErrorResponse extends Error {
    constructor(errors: ErrorData[], code: number) {
        const json = {
            apiError: true,
            code: code,
            errors: [] as ErrorData[]
        }
        errors.forEach(err => {
            const data: ErrorData = {error: err.error || "unknown", message: err.message || "unknown"};
            json.errors.push(data);
        });
        const message = JSON.stringify(json);
        super(message)
    }
}