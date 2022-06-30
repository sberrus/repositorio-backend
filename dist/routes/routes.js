"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers/controllers");
const validarRecaptcha_1 = require("../middleware/validarRecaptcha");
const validarCampos_1 = require("../middleware/validarCampos");
/**
 * route:
 * /api/contact-email
 */
const router = (0, express_1.Router)();
router.post("/", [
    (0, express_validator_1.body)("g-recaptcha-response").notEmpty().isLength({ min: 300, max: 500 }),
    validarRecaptcha_1.validateRecaptchaRes,
    (0, express_validator_1.body)("from").notEmpty().isEmail(),
    (0, express_validator_1.body)("subject").notEmpty().isLength({ min: 10, max: 100 }),
    (0, express_validator_1.body)("message").notEmpty().isLength({ min: 10, max: 5000 }),
    validarCampos_1.validarCampos,
], controllers_1.sendContactEmail);
exports.default = router;
//# sourceMappingURL=routes.js.map