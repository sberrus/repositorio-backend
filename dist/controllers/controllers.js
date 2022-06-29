"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactEmail = void 0;
const sendContactEmail = (req, res) => {
    const body = req.body;
    res.json({
        ok: true,
        msg: "Holi",
        body,
    });
};
exports.sendContactEmail = sendContactEmail;
//# sourceMappingURL=controllers.js.map