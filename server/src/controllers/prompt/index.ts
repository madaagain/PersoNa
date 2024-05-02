import { Request, Response } from "express";
import {checkToken, IUser} from "../../models/User";
import getParameters from "../../utils/getParameters";
import { asyncHandler } from "../../utils/asyncHandler";
import { context } from "../../middleware/sendApiRequestAndSaveContext";

const url = 'http://localhost:11434/api/generate';
export const prompt = asyncHandler(async (req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.flushHeaders();

    const { query } =  getParameters(req, ["query"]);
    const user = await checkToken(req);
    const prompt = "Je suis " + user.firstname + " " + user.lastname + ", j'occupe le poste de " + user.job;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'model':'mistral',
            'prompt': query,
            'options':{
                'temperature': 0.1
            },
            'context' : context
        }),
    });
    try {
        if (response.body) {
            const reader = response.body.getReader();
            let buffer = '';
            let done = false;
            while (!done) {
                const { done: chunkDone, value } = await reader.read();
                done = chunkDone;
                const chunkText = new TextDecoder().decode(value);
                buffer += chunkText;
                while (buffer.includes('\n')) {
                    const line = buffer.slice(0, buffer.indexOf('\n'));
                    buffer = buffer.slice(buffer.indexOf('\n') + 1);
                    try {
                        const responseData = JSON.parse(line);
                        const { response } = responseData;
                        process.stdout.write(`${response}`);
                        res.write(response);
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                }
            }
            res.end();
        } else {
            console.error('Response body is null');
            res.end();
        }
    } catch (error) {
        console.error('Error reading response body:', error);
        res.end();
    }
});
