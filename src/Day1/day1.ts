import path from 'path';
import fs from 'fs';
import assert from 'assert';

//const data = fs.readFileSync(path.join(__dirname, './test.txt'), 'utf-8');
const data = fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8');

export class Day1
{
	totals: Array<number> = new Array();
	lines: string[] = data.split(/\r?\n/);

	public Run()
	{
		console.log("\n--- Day 1: Calorie Counting ---");

		this.BuildElfTotals();

		assert(this.Part1() === 70509);
		assert(this.Part2() === 208567);
	}

	private BuildElfTotals()
	{
		var total: number = 0;

		for(var line of this.lines)
		{
			if(line.length === 0)
			{
				this.totals.push(total);
				total = 0;
				continue;
			}

			total += Number.parseInt(line);
		}

		this.totals.push(total);

		this.totals.sort((n1,n2) => n2 - n1);
	}

	private Part1(): number
	{
		var answer: number = this.totals[0];
		console.log("Top Elf ", answer);
		return answer;
	}

	private Part2(): number
	{
		var answer: number = this.totals[0] + this.totals[1] + this.totals[2];
		console.log("Top 3 Elves", answer);
		return answer;
	}
}

