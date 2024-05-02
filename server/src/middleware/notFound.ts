import { Request, Response } from "express";

export default function notFound(req: Request, res: Response) {
    return res.status(404).json({errors : [{error:"API", message: "EndPoint not found"}]});
}

