import { Request, Response } from "express";
import { sendEmail } from "../utils/emailSender";

export const sendContactEmail = async (request: Request, response: Response) => {
	const { from, subject, message } = request.body;
	// send email
	try {
		await sendEmail(from, subject, message);
	} catch (error) {}

	console.log("Correo enviado con exito");
	response.json({
		ok: true,
	});
};
