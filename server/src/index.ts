import app from "./server";
import {readDocumentsRecursivelyInFolder} from "./middleware/getAllData";
import {generatePromptWithDocumentContent} from "./middleware/generatePrompt";

const port = process.env.PORT || 3000;
async function initMistralWithData() {
    await readDocumentsRecursivelyInFolder("test-data/");
}

app.listen(port, async () => {
    await generatePromptWithDocumentContent();
    await initMistralWithData();
    console.log(`Pam Api listening at http://localhost:${port}`);
});
