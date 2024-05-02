import { NextFunction, Request, Response } from "express"

export const asyncHandler = (fn: Function) =>
function asyncHandlerWrap(req: Request, res: Response, next: NextFunction) {
    return Promise.resolve(fn(req, res, next)).catch(next)
}