import path from 'path';
import fs from 'fs';
import assert from 'assert';

//const data = fs.readFileSync(path.join(__dirname, './test.txt'), 'utf-8');
const data = fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8');

export class Day2
{
	lines: string[] = data.split(/\r?\n/);

	public Run()
	{
		console.log("\n--- Day 2: Rock Paper Scissors ---");

		assert(this.Part1() === 10595);
		assert(this.Part2() === 9541);
	}

	private getPlay(line: string): Play
	{
		var play: Play = new Play();
		var hands: string[] = line.split(" ");

		play.them = hands[0];
		play.you = hands[1];
		play.themNum = play.toNum(play.them);
		play.youNum = play.toNum(play.you);

		return play;
	}

	private Part1(): number
	{
		var total: number = 0;

		for(var line of this.lines)
		{
			var score: number = 0;
			var play: Play = this.getPlay(line);

			score += play.youNum + 1;

			switch(play.outcome())
			{
				case Outcome.lose: break;
				case Outcome.draw: score += 3; break;
				case Outcome.win: score += 6; break;
			}

			total += score;
		}

		console.log("Rock, Paper, Scissors Score ", total);

		return total;
	}

	private Part2(): number
	{
		var total: number = 0;

		for(var line of this.lines)
		{
			var score: number = 0;
			var play: Play = this.getPlay(line);

			play.force();

			score += play.youNum + 1;

			switch(play.outcome())
			{
				case Outcome.lose: break;
				case Outcome.draw: score += 3; break;
				case Outcome.win: score += 6; break;
			}

			total += score;
		}

		console.log("Rock, Paper, Scissors Score ", total);

		return total;
	}
}

enum Outcome
{
	lose = 0,
	draw = 3,
	win = 6
}

class Play
{
	them: string = "";
	you: string = "";

	themNum: number = 0;
	youNum: number = 0;

	public outcome(): Outcome
	{
		if( this.youNum == this.themNum)
			return Outcome.draw;
		if( (this.youNum === 1 && this.themNum === 0) ||
			(this.youNum === 2 && this.themNum === 1) ||
			(this.youNum === 0 && this.themNum === 2) )
			return Outcome.win;

		return Outcome.lose;
	}

	public force()
	{
		if(this.youNum === 0)
			this.youNum = (this.themNum + 3 - 1) % 3;

		else if(this.youNum === 1)
			this.youNum = this.themNum;

		else if(this.youNum === 2)
			this.youNum = (this.themNum + 1) % 3;
	}

	public toNum(char: string): number
	{
		switch(char)
		{
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

