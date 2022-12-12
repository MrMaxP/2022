import path from 'path';
import fs from 'fs';
import assert from 'assert';

const data = fs.readFileSync(path.join(__dirname, './test.txt'), 'utf-8');
//const data = fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8');

export class Day9
{
	lines: string[] = data.split(/\r?\n/);

	public Run()
	{
		console.log("\n--- Day 9: Rope Bridge ---");

		this.Part1();
		this.Part2();

//		assert(this.Part1() === 70509);
//		assert(this.Part2() === 208567);
	}

	private Part1(): number
	{
		return 0;
	}

	private Part2(): number
	{
		return 0;
	}
}

