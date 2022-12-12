"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day7 = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const data = fs_1.default.readFileSync(path_1.default.join(__dirname, './test.txt'), 'utf-8');
//const data = fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8');
class Day7 {
    constructor() {
        this.lines = data.split(/\r?\n/);
    }
    Run() {
        console.log("\n--- Day 7: ---");
        this.Part1();
        this.Part2();
        //		assert(this.Part1() === 70509);
        //		assert(this.Part2() === 208567);
    }
    Part1() {
        return 0;
    }
    Part2() {
        return 0;
    }
}
exports.Day7 = Day7;
//# sourceMappingURL=day7.js.map