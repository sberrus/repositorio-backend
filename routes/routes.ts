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
router.get("/ping", (req, res) => {
	res.send("pong");
});
router.post(
	"/",
	[
		body("g-recaptcha-response").notEmpty().isLength({ min: 300, max: 500 }).bail(),
		body("from").notEmpty().isEmail(),
		body("subject")
			.notEmpty()
			.isLength({ max: 100 })
			.withMessage("El contenido debe ser mayor a 3 caracteres y menor de 100"),
		body("message")
			.notEmpty()
			.isLength({ max: 5000 })
			.withMessage("El contenido debe ser mayor a 10 caracteres y menor de 5000"),
		validateRecaptchaRes,
		validarCampos,
	],
	sendContactEmail
);

export default router;
