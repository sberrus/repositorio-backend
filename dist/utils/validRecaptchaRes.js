"use strict";
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
const G_RECAPTCHA_SECRET = process.env.G_RECAPTCHA_SECRET;
const validateRecaptchaRes = (recaptchaRes) => __awaiter(void 0, void 0, void 0, function* () {
    if (!recaptchaRes) {
        throw new Error("Captcha Invalid");
    }
    try {
        const res = yield axios_1.default.post("https://www.google.com/recaptcha/api/siteverify", {
            secret: G_RECAPTCHA_SECRET,
            response: recaptchaRes,
        });
        if (res.status !== 200) {
            throw new Error("Hubo un error en la petición");
        }
        if (!res.data.success) {
            throw new Error("Recaptcha No válido");
        }
        console.log("Esto no deberia verse");
    }
    catch (error) {
        console.log(error);
    }
});
exports.validateRecaptchaRes = validateRecaptchaRes;
//# sourceMappingURL=validRecaptchaRes.js.map