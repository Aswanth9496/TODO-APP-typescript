"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const control_1 = __importDefault(require("../controller/control"));
const router = express_1.default.Router();
router.get('/', control_1.default.loadDashboard);
exports.default = router;
