import * as express from "express";
import * as authController from "../../controllers/auth/index";

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);

export default router;
