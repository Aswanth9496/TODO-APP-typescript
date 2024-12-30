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
const userSchema_1 = __importDefault(require("../model/userSchema"));
const loadDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userSchema_1.default.find();
        res.render("dashboard", { users });
    }
    catch (error) {
        console.log(error);
    }
});
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, age } = req.body;
        const existingUser = yield userSchema_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "user already exists" });
            return;
        }
        const newUser = new userSchema_1.default({
            name,
            email,
            age,
        });
        yield newUser.save();
        res.status(200).json({ message: "user created" });
    }
    catch (error) {
        console.log(error);
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userSchema_1.default.findByIdAndDelete(req.params.userId);
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
    }
});
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userSchema_1.default.findByIdAndUpdate(req.params.userId, req.body);
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = {
    loadDashboard,
    addUser,
    deleteUser,
    editUser
};
