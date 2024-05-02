import { NextFunction, Request, Response } from "express";

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    try {
        const error = JSON.parse(err.message);
        if (!error.apiError) {
            throw new Error("Internal error");
        }
        return res.status(error.code).json({errors: error.errors});
        
    } catch(e) {
        console.error(err);
        return res.status(500).json({errors: {"message": "Internal error"}});
    }
}
