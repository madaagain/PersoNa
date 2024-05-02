import {IUser} from "../models/User";
import allData = require("./getAllData");

const url = 'http://localhost:11434/api/generate';
export let context = [];

export async function sendAiRequestAndSaveContext(query : string, content : string) {
    console.log("Reading " + query + "...")
    const data = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'model': 'mistral',
            'prompt': content,
            'stream': false,
            'options' : {
                'temperature' : 0.01,
                'num_predict' : -2
            },
            'context': context
        }),
    });
    console.log("Done")
    context = (await data.json()).context;
}
