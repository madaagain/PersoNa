import { Request } from "express"
import { ErrorData, ErrorResponse } from "./errorResponse";

export default function(req: Request, requiredParams: string[]) {
    const missingParams: ErrorData[] = requiredParams
    .filter(param => !(param in req.body))
    .map(param => ({ error: param, message: 'missing parameter' }));
    if (missingParams.length > 0) {
        throw new ErrorResponse(missingParams, 400);
    }

    const params: { [key: string]: any } = {};
    requiredParams.forEach(param => {
        params[param] = req.body[param];
    });
    return params;
}
