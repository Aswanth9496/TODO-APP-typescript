"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const router_1 = __importDefault(require("./router/router"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json()); //json parse cheyyan
app.use(express_1.default.urlencoded({ extended: true })); // path params query params okke parse cheyyan venditt
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "../src/views"));
app.use((0, morgan_1.default)('dev'));
app.use('/', router_1.default);
mongoose_1.default.connect(process.env.MONGODB).then(() => {
    console.log("connected");
})
    .catch((error) => {
    console.log(error);
});
app.listen(3000, () => {
    console.log(`http://localhost:3000`);
});
