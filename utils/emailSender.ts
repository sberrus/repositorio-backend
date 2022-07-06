import * as nodemailer from "nodemailer";

export const sendEmail = async (from: string, subject: string, message: string) => {
	const SENDER_EMAIL = process.env.SENDER_EMAIL;
	const SENDER_PASSWORD = process.env.SENDER_PASSWORD;
	const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: "smtp.ionos.es",
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: SENDER_EMAIL, // generated ethereal user
			pass: SENDER_PASSWORD, // generated ethereal password
		},
	});
	// send mail with defined transport object

	try {
		await transporter.sendMail({
			from: `"samdev's form" <webmaster@samdev.es>`, // sender address
			to: `${RECEIVER_EMAIL}`, // list of receivers
			subject: `samdev's form: ${subject}`, // Subject line
			text: `
			<div>
				<h5>Correo del emisor: ${from}</h5>
				<hr/>
				<p>${message}</p>
			</div>
			`, // plain text body
			html: `
			<div>
				<h5>Correo del emisor: ${from}</h5>
				<hr/>
				<p>${message}</p>
			</div>
			`, // html body
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error la enviar el email");
	}
};
