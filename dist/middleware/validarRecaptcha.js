"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRecaptchaRes = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const qs = __importStar(require("qs"));
dotenv_1.default.config();
const G_RECAPTCHA_SECRET = process.env.G_RECAPTCHA_SECRET;
const validateRecaptchaRes = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const recaptchaRes = request.body["g-recaptcha-response"];
    if (!recaptchaRes) {
        response.status(401).json({ ok: false, msg: "El recaptcha es obligatorio" });
        return;
    }
    try {
        const data = {
            secret: G_RECAPTCHA_SECRET,
            response: recaptchaRes,
        };
        const config = {
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: qs.stringify(data),
            url: "https://www.google.com/recaptcha/api/siteverify",
        };
        const validationResponse = yield (0, axios_1.default)(config);
        if (validationResponse.status !== 200) {
            response.status(502).json({ ok: false, msg: "Hubo un error en la petición de la validación" });
            return;
        }
        if (!validationResponse.data.success) {
            response.status(502).json({ ok: false, msg: "El recaptcha no es válido", error: validationResponse.data });
            return;
        }
        else {
            next();
        }
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: "Error en el servidor - recaptcha",
        });
    }
});
exports.validateRecaptchaRes = validateRecaptchaRes;
//# sourceMappingURL=validarRecaptcha.js.map