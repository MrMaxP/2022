"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day5 = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const assert_1 = __importDefault(require("assert"));
//const data = fs.readFileSync(path.join(__dirname, './test.txt'), 'utf-8');
const data = fs_1.default.readFileSync(path_1.default.join(__dirname, './data.txt'), 'utf-8');
class Day5 {
    constructor() {
        this.lines = data.split(/\r?\n/);
        this.moves = new Array();
        this.stacks = new Array();
    }
    Run() {
        console.log("\n--- Day 5: ---");
        this.getMoves();
        // this.Part1();
        // this.Part2();
        (0, assert_1.default)(this.Part1() === "ZRLJGSCTR");
        (0, assert_1.default)(this.Part2() === "PRTTGRFPB");
    }
    Part1() {
        this.buildStack();
        this.executeMoves9000();
        const tops = this.getStacksTop();
        console.log("CrateMover 9000 = ", tops);
        return tops;
    }
    Part2() {
        this.buildStack();
        this.executeMoves9001();
        const tops = this.getStacksTop();
        console.log("CrateMover 9001 = ", tops);
        return tops;
    }
    getStacksTop() {
        let tops = "";
        for (const s in this.stacks) {
            tops += this.stacks[s].substring(this.stacks[s].length - 1);
        }
        return tops;
    }
    buildStack() {
        this.stacks = new Array();
        for (const line of this.lines) {
            let index = 1;
            let stack = 0;
            if (line.charAt(index) === '1') {
                return;
            }
            while (index < line.length) {
                if (line.charAt(index) !== ' ') {
                    if (this.stacks[stack] === undefined) {
                        this.stacks[stack] = line.charAt(index);
                    }
                    else {
                        this.stacks[stack] = line.charAt(index) + this.stacks[stack];
                    }
                }
                index += 4;
                stack++;
            }
        }
    }
    executeMoves9000() {
        for (const move of this.moves) {
            const stack = this.stacks[move.from];
            const start = stack.substring(0, stack.length - move.count);
            const end = this.reverseString(stack.substring(stack.length - move.count));
            this.stacks[move.from] = start;
            this.stacks[move.to] += end;
        }
    }
    executeMoves9001() {
        for (const move of this.moves) {
            const stack = this.stacks[move.from];
            const start = stack.substring(0, stack.length - move.count);
            const end = stack.substring(stack.length - move.count);
            this.stacks[move.from] = start;
            this.stacks[move.to] += end;
        }
    }
    reverseString(str) {
        let newString = "";
        for (let i = str.length - 1; i >= 0; i--) {
            newString += str[i];
        }
        return newString;
    }
    getMoves() {
        for (const line of this.lines) {
            if (line.startsWith("move")) {
                this.moves.push(new Move(line));
            }
        }
    }
}
exports.Day5 = Day5;
class Move {
    constructor(move) {
        this.count = 0;
        this.from = 0;
        this.to = 0;
        const split = move.split(" ");
        this.count = Number.parseInt(split[1]);
        this.from = Number.parseInt(split[3]) - 1; // Make stack index zero relative
        this.to = Number.parseInt(split[5]) - 1;
    }
}
//# sourceMappingURL=day5.js.map