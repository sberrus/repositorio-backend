import axios from "axios";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import * as qs from "qs";

dotenv.config();

const G_RECAPTCHA_SECRET = process.env.G_RECAPTCHA_SECRET;

export const validateRecaptchaRes = async (request: Request, response: Response, next: NextFunction) => {
	const recaptchaRes = request.body["g-recaptcha-response"];

	if (!recaptchaRes) {
		return response.status(401).json({ ok: false, msg: "El recaptcha es obligatorio" });
	}

	try {
		const data = {
			secret: G_RECAPTCHA_SECRET,
			response: recaptchaRes,
		};
		const config = {
			method: "POST",
			headers: { "content-type": "application/x-www-form-urlencoded" },
			data: qs.stringify(data),
			url: "https://www.google.com/recaptcha/api/siteverify",
		};

		const validationResponse = await axios(config);
		if (validationResponse.status !== 200) {
			return response.status(502).json({ ok: false, msg: "Hubo un error en la petición de la validación" });
		}
		if (!validationResponse.data.success) {
			return response
				.status(502)
				.json({ ok: false, msg: "El recaptcha no es válido", error: validationResponse.data });
		} else {
			next();
		}
	} catch (error) {
		console.log(error);
		return response.status(500).json({
			ok: false,
			msg: "Error en el servidor - recaptcha",
		});
	}
};
