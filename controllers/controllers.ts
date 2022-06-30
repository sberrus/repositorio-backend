import { Request, Response } from "express";

export const sendContactEmail = async (request: Request, response: Response) => {
	const recaptchaRes = request.body["g-recaptcha-response"];
	const { from, subject, message } = request.body;

	console.log(request.body);

	console.log("Todo correcto");
	response.json({
		ok: true,
	});
};
