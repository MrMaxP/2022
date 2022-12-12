"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day6 = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const assert_1 = __importDefault(require("assert"));
//const data = fs.readFileSync(path.join(__dirname, './test.txt'), 'utf-8');
const data = fs_1.default.readFileSync(path_1.default.join(__dirname, './data.txt'), 'utf-8');
class Day6 {
    constructor() {
        this.lines = data.split(/\r?\n/);
        this.counts = [];
    }
    Run() {
        console.log("\n--- Day 6: Tuning Trouble ---");
        //		this.Part1();
        //		this.Part2();
        (0, assert_1.default)(this.Part1() === 1542);
        (0, assert_1.default)(this.Part2() === 3153);
    }
    Part1() {
        const index = this.findUnique(4);
        console.log("Start of packet = ", index);
        return index;
    }
    Part2() {
        const index = this.findUnique(14);
        console.log("Start of message = ", index);
        return index;
    }
    findUnique(runLen) {
        const line = this.lines[0];
        this.counts = [];
        for (let i = 0; i < 26; i++) {
            this.counts[i] = 0;
        }
        for (let index = 0; index < line.length; index++) {
            this.counts[line.charCodeAt(index) - 'a'.charCodeAt(0)]++;
            if (index - runLen >= 0) {
                this.counts[line.charCodeAt(index - runLen) - 'a'.charCodeAt(0)]--;
            }
            if (this.checkUniqueness(runLen)) {
                return index + 1;
            }
        }
        return 0;
    }
    checkUniqueness(runLen) {
        for (const count of this.counts) {
            if (count === 1) {
                runLen--;
            }
            else if (count > 1) {
                return false;
            }
        }
        return runLen === 0;
    }
}
exports.Day6 = Day6;
//# sourceMappingURL=day6.js.map