"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day2 = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const assert_1 = __importDefault(require("assert"));
//const data = fs.readFileSync(path.join(__dirname, './test.txt'), 'utf-8');
const data = fs_1.default.readFileSync(path_1.default.join(__dirname, './data.txt'), 'utf-8');
class Day2 {
    constructor() {
        this.lines = data.split(/\r?\n/);
    }
    Run() {
        console.log("\n--- Day 2: Rock Paper Scissors ---");
        (0, assert_1.default)(this.Part1() === 10595);
        (0, assert_1.default)(this.Part2() === 9541);
    }
    getPlay(line) {
        var play = new Play();
        var hands = line.split(" ");
        play.them = hands[0];
        play.you = hands[1];
        play.themNum = play.toNum(play.them);
        play.youNum = play.toNum(play.you);
        return play;
    }
    Part1() {
        var total = 0;
        for (var line of this.lines) {
            var score = 0;
            var play = this.getPlay(line);
            score += play.youNum + 1;
            switch (play.outcome()) {
                case Outcome.lose: break;
                case Outcome.draw:
                    score += 3;
                    break;
                case Outcome.win:
                    score += 6;
                    break;
            }
            total += score;
        }
        console.log("Rock, Paper, Scissors Score ", total);
        return total;
    }
    Part2() {
        var total = 0;
        for (var line of this.lines) {
            var score = 0;
            var play = this.getPlay(line);
            play.force();
            score += play.youNum + 1;
            switch (play.outcome()) {
                case Outcome.lose: break;
                case Outcome.draw:
                    score += 3;
                    break;
                case Outcome.win:
                    score += 6;
                    break;
            }
            total += score;
        }
        console.log("Rock, Paper, Scissors Score ", total);
        return total;
    }
}
exports.Day2 = Day2;
var Outcome;
(function (Outcome) {
    Outcome[Outcome["lose"] = 0] = "lose";
    Outcome[Outcome["draw"] = 3] = "draw";
    Outcome[Outcome["win"] = 6] = "win";
})(Outcome || (Outcome = {}));
class Play {
    constructor() {
        this.them = "";
        this.you = "";
        this.themNum = 0;
        this.youNum = 0;
    }
    outcome() {
        if (this.youNum == this.themNum)
            return Outcome.draw;
        if ((this.youNum === 1 && this.themNum === 0) ||
            (this.youNum === 2 && this.themNum === 1) ||
            (this.youNum === 0 && this.themNum === 2))
            return Outcome.win;
        return Outcome.lose;
    }
    force() {
        if (this.youNum === 0)
            this.youNum = (this.themNum + 3 - 1) % 3;
        else if (this.youNum === 1)
            this.youNum = this.themNum;
        else if (this.youNum === 2)
            this.youNum = (this.themNum + 1) % 3;
    }
    toNum(char) {
        switch (char) {
            case "A": return 0;
            case "B": return 1;
            case "C": return 2;
            case "X": return 0;
            case "Y": return 1;
            case "Z": return 2;
        }
        return 0;
    }
}
//# sourceMappingURL=day2.js.map