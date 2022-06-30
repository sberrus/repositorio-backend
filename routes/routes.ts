import { Router } from "express";
import { sendContactEmail } from "../controllers/controllers";
import { validateRecaptchaRes } from "../middleware/validarRecaptcha";
/**
 * route:
 * /api/contact-email
 */

const router = Router();

router.post("/", [validateRecaptchaRes], sendContactEmail);

export default router;
