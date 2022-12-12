"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day3 = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const assert_1 = __importDefault(require("assert"));
//const data = fs.readFileSync(path.join(__dirname, './test.txt'), 'utf-8');
const data = fs_1.default.readFileSync(path_1.default.join(__dirname, './data.txt'), 'utf-8');
class Day3 {
    constructor() {
        this.lines = data.split(/\r?\n/);
    }
    Run() {
        console.log("\n--- Day 3: Rucksack Reorganization ---");
        //		this.Part1();
        //		this.Part2();
        (0, assert_1.default)(this.Part1() === 7742);
        (0, assert_1.default)(this.Part2() === 2276);
    }
    Part1() {
        let total = 0;
        for (let line of this.lines) {
            let left = new Rucksack(line.substring(0, line.length / 2));
            let right = new Rucksack(line.substring(line.length / 2, line.length));
            let priority = left.match(right) + 1;
            total += priority;
        }
        console.log("Priority sum ", total);
        return total;
    }
    Part2() {
        let total = 0;
        for (let l = 0; l < this.lines.length; l += 3) {
            let elf1 = new Rucksack(this.lines[l + 0]);
            let elf2 = new Rucksack(this.lines[l + 1]);
            let elf3 = new Rucksack(this.lines[l + 2]);
            let priority = elf1.match(elf2, elf3) + 1;
            total += priority;
        }
        console.log("Badge sum ", total);
        return total;
    }
}
exports.Day3 = Day3;
class Rucksack {
    constructor(items) {
        this.items = new Array(52);
        this.clearItems();
        for (let c = 0; c < items.length; c++) {
            this.addItem(items.charAt(c));
        }
    }
    clearItems() {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i] = 0;
        }
    }
    addItem(item) {
        let code = item.charCodeAt(0);
        if (code >= 'A'.charCodeAt(0) && (code <= 'Z'.charCodeAt(0))) {
            code = (code - 'A'.charCodeAt(0)) + 26;
        }
        else if (code >= 'a'.charCodeAt(0) && (code <= 'z'.charCodeAt(0))) {
            code -= 'a'.charCodeAt(0);
        }
        this.items[code] += 1;
    }
    match(sack1, sack2 = undefined) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] !== 0 && sack1.items[i] !== 0) {
                if (sack2 === undefined) {
                    return i;
                }
                else {
                    if (sack2.items[i] !== 0) {
                        return i;
                    }
                }
            }
        }
        return 0;
    }
}
//# sourceMappingURL=day3.js.map