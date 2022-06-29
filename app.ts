import dotenv from "dotenv";
import { Server } from "./model/server";
dotenv.config();

const server = new Server();
server.listen();
