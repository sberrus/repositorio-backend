import { Request, Response } from "express";

export const sendContactEmail = async (request: Request, response: Response) => {
	// send email

	console.log("Correo enviado con exito");
	response.json({
		ok: true,
	});
};
