"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers/controllers");
const router = (0, express_1.Router)();
router.get("/", controllers_1.sendContactEmail);
exports.default = router;
//# sourceMappingURL=routes.js.map