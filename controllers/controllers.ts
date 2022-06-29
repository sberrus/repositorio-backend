import { Request, Response } from "express";

export const sendContactEmail = (req: Request, res: Response) => {
	const body = req.body;
	res.json({
		ok: true,
		msg: "Holi",
		body,
	});
};
