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
router.get("/ping", (req, res) => {
    res.send("pong");
});
router.post("/", [
    (0, express_validator_1.body)("g-recaptcha-response").notEmpty().isLength({ min: 300, max: 500 }).bail(),
    (0, express_validator_1.body)("from").notEmpty().isEmail(),
    (0, express_validator_1.body)("subject")
        .notEmpty()
        .isLength({ max: 100 })
        .withMessage("El contenido debe ser mayor a 3 caracteres y menor de 100"),
    (0, express_validator_1.body)("message")
        .notEmpty()
        .isLength({ max: 5000 })
        .withMessage("El contenido debe ser mayor a 10 caracteres y menor de 5000"),
    validarRecaptcha_1.validateRecaptchaRes,
    validarCampos_1.validarCampos,
], controllers_1.sendContactEmail);
exports.default = router;
//# sourceMappingURL=routes.js.map