"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers/controllers");
const validarRecaptcha_1 = require("../middleware/validarRecaptcha");
/**
 * route:
 * /api/contact-email
 */
const router = (0, express_1.Router)();
router.post("/", [validarRecaptcha_1.validateRecaptchaRes], controllers_1.sendContactEmail);
exports.default = router;
//# sourceMappingURL=routes.js.map