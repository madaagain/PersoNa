import * as express from "express";
import * as promptController from "../../controllers/prompt/index";

const router = express.Router();

router.post("/prompt", promptController.prompt);

export default router;
