"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day1 = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const test = fs_1.default.readFileSync(path_1.default.join(__dirname, './test.txt'), 'utf-8');
const data = fs_1.default.readFileSync(path_1.default.join(__dirname, './test.txt'), 'utf-8');
class Day1 {
    Run() {
        console.log("--- Day 1: Calorie Counting ---");
        console.log(test);
    }
}
exports.Day1 = Day1;
//# sourceMappingURL=day1.js.map