import express, { Application, json } from "express";
import router from "../routes/routes";

export class Server {
	private app: Application;
	private port: string;
	private apiPath = {
		contactForm: "/api/contact-form",
	};
	constructor() {
		this.app = express();
		this.port = process.env.PORT || "8080";
		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.app.use(json());
	}
	routes() {
		// contact-form api
		this.app.use(this.apiPath.contactForm, router);
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("servidor correindo en puerto " + this.port);
		});
	}
}
