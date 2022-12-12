"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day1 = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const assert_1 = __importDefault(require("assert"));
//const data = fs.readFileSync(path.join(__dirname, './test.txt'), 'utf-8');
const data = fs_1.default.readFileSync(path_1.default.join(__dirname, './data.txt'), 'utf-8');
class Day1 {
    constructor() {
        this.totals = new Array();
        this.lines = data.split(/\r?\n/);
    }
    Run() {
        console.log("\n--- Day 1: Calorie Counting ---");
        this.BuildElfTotals();
        (0, assert_1.default)(this.Part1() === 70509);
        (0, assert_1.default)(this.Part2() === 208567);
    }
    BuildElfTotals() {
        var total = 0;
        for (var line of this.lines) {
            if (line.length === 0) {
                this.totals.push(total);
                total = 0;
                continue;
            }
            total += Number.parseInt(line);
        }
        this.totals.push(total);
        this.totals.sort((n1, n2) => n2 - n1);
    }
    Part1() {
        var answer = this.totals[0];
        console.log("Top Elf ", answer);
        return answer;
    }
    Part2() {
        var answer = this.totals[0] + this.totals[1] + this.totals[2];
        console.log("Top 3 Elves", answer);
        return answer;
    }
}
exports.Day1 = Day1;
//# sourceMappingURL=day1.js.map