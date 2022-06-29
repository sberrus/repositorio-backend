import { Router } from "express";
import { sendContactEmail } from "../controllers/controllers";

const router = Router();

router.get("/", sendContactEmail);

export default router;
