import { Router } from "express";
import { body } from "express-validator";
import { sendContactEmail } from "../controllers/controllers";
import { validateRecaptchaRes } from "../middleware/validarRecaptcha";
import { validarCampos } from "../middleware/validarCampos";
/**
 * route:
 * /api/contact-email
 */

const router = Router();

router.post(
	"/",
	[
		body("g-recaptcha-response").notEmpty().isLength({ min: 300, max: 500 }),
		validateRecaptchaRes,
		body("from").notEmpty().isEmail(),
		body("subject").notEmpty().isLength({ min: 10, max: 100 }),
		body("message").notEmpty().isLength({ min: 10, max: 5000 }),
		validarCampos,
	],
	sendContactEmail
);

export default router;
