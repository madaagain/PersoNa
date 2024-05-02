import * as fs from 'fs';
import * as path from "path";
import * as pdfParse from 'pdf-parse';
import * as mammoth from "mammoth";
import {sendAiRequestAndSaveContext} from "./sendApiRequestAndSaveContext";

async function readDocument(filePath: string): Promise<string> {
    const fileExtension = filePath.split('.').pop()?.toLowerCase();
    if (fileExtension === 'docx') {
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value;
    }
    if (fileExtension === 'pdf') {
        const pdfData = await fs.promises.readFile(filePath);
        return (await pdfParse(pdfData)).text;
    }
    console.error(filePath + " : Extension invalide");
    return "";
}

export async function readDocumentsRecursivelyInFolder(folderPath: string): Promise<string> {
    const files = fs.readdirSync(folderPath);
    let res = "";
    for (const file of files) {
        const filePath = path.join(folderPath, file);

        if (fs.statSync(filePath).isDirectory()) {
            res += await readDocumentsRecursivelyInFolder(filePath);
        } else {
            const doc = await readDocument(filePath);
            if (doc == "")
                continue;
            await sendAiRequestAndSaveContext(filePath, "DOCUMENT FRANCAIS : " + filePath + "\n" + doc);
        }
    }
    return res;
}
