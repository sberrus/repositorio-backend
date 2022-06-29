import express, { Application, json } from "express";
import router from "../routes/routes";

export class Server {
	private app: Application;
	private port: string;
	private apiPath = {
		contactEmail: "/api/contact-email",
	};
	constructor() {
		this.app = express();
		this.port = process.env.PORT || "8000";
		this.middlewares();
		this.routes();
	}

	middlewares() {
		//
		this.app.use(json());
	}
	routes() {
		this.app.use(this.apiPath.contactEmail, router);
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("servidor correindo en puerto " + this.port);
		});
	}
}
