"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day4 = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const assert_1 = __importDefault(require("assert"));
//const data = fs.readFileSync(path.join(__dirname, './test.txt'), 'utf-8');
const data = fs_1.default.readFileSync(path_1.default.join(__dirname, './data.txt'), 'utf-8');
class Day4 {
    constructor() {
        this.lines = data.split(/\r?\n/);
    }
    //	groups: Array<Group> = new Array();
    Run() {
        console.log("\n--- Day 4: Camp Cleanup ---");
        //		this.Part1();
        //		this.Part2();
        (0, assert_1.default)(this.Part1() === 448);
        (0, assert_1.default)(this.Part2() === 794);
    }
    Part1() {
        let total = 0;
        for (let line of this.lines) {
            let group = new Group(line);
            if (group.contains()) {
                total++;
            }
        }
        console.log("Fully contains = ", total);
        return total;
    }
    Part2() {
        let total = 0;
        for (let line of this.lines) {
            let group = new Group(line);
            if (group.overlaps()) {
                total++;
            }
        }
        console.log("Fully contains = ", total);
        return total;
    }
}
exports.Day4 = Day4;
class Range {
    constructor(group) {
        this.min = 0;
        this.max = 0;
        let minmax = group.split("-");
        this.min = Number.parseInt(minmax[0]);
        this.max = Number.parseInt(minmax[1]);
    }
}
class Group {
    constructor(line) {
        let halves = line.split(",");
        this.group1 = new Range(halves[0]);
        this.group2 = new Range(halves[1]);
    }
    contains() {
        var _a, _b, _c, _d, _e, _f;
        if (this.group1 === undefined || this.group2 === undefined) {
            return false;
        }
        // I'm sure there's a mathematical way to do this in a shorter term, but I can't be arsed! :)
        if (((_a = this.group1) === null || _a === void 0 ? void 0 : _a.min) >= this.group2.min && ((_b = this.group1) === null || _b === void 0 ? void 0 : _b.max) <= ((_c = this.group2) === null || _c === void 0 ? void 0 : _c.max)) {
            return true;
        }
        if (((_d = this.group2) === null || _d === void 0 ? void 0 : _d.min) >= this.group1.min && ((_e = this.group2) === null || _e === void 0 ? void 0 : _e.max) <= ((_f = this.group1) === null || _f === void 0 ? void 0 : _f.max)) {
            return true;
        }
        return false;
    }
    overlaps() {
        var _a, _b, _c;
        if (this.group1 === undefined || this.group2 === undefined) {
            return false;
        }
        // I'm sure there's a mathematical way to do this in a shorter term, but I can't be arsed! :)
        if (!(((_a = this.group1) === null || _a === void 0 ? void 0 : _a.min) > this.group2.max || ((_b = this.group2) === null || _b === void 0 ? void 0 : _b.min) > ((_c = this.group1) === null || _c === void 0 ? void 0 : _c.max))) {
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=day4.js.map