import path from 'path';
import fs from 'fs';
import assert from 'assert';

//const data = fs.readFileSync(path.join(__dirname, './test.txt'), 'utf-8');
const data = fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8');

export class Day4
{
	lines: string[] = data.split(/\r?\n/);
//	groups: Array<Group> = new Array();

	public Run()
	{
		console.log("\n--- Day 4: Camp Cleanup ---");

//		this.Part1();
//		this.Part2();

		assert(this.Part1() === 448);
		assert(this.Part2() === 794);
	}

	private Part1(): number
	{
		let total: number = 0;

		for(let line of this.lines)
		{
			let group: Group = new Group(line);

			if(group.contains())
			{
				total++;
			}
		}

		console.log("Fully contains = ", total);

		return total;
	}

	private Part2(): number
	{
		let total: number = 0;

		for(let line of this.lines)
		{
			let group: Group = new Group(line);

			if(group.overlaps())
			{
				total++;
			}
		}

		console.log("Fully contains = ", total);

		return total;
	}
}

class Range
{
	min: number = 0;
	max: number = 0;

	constructor(group: string)
	{
		let minmax: string[] = group.split("-");
		this.min = Number.parseInt(minmax[0]);
		this.max = Number.parseInt(minmax[1]);
	}
}

class Group
{
	group1: Range | undefined;
	group2: Range | undefined;

	constructor(line: string)
	{
		let halves: string[] = line.split(",");

		this.group1 = new Range(halves[0]);
		this.group2 = new Range(halves[1]);
	}

	contains(): boolean
	{
		if(this.group1 === undefined || this.group2 === undefined)
		{
			return false;
		}

		// I'm sure there's a mathematical way to do this in a shorter term, but I can't be arsed! :)
		if(this.group1?.min >= this.group2.min && this.group1?.max <= this.group2?.max )
		{
			return true;
		}

		if(this.group2?.min >= this.group1.min && this.group2?.max <= this.group1?.max )
		{
			return true;
		}

		return false;
	}

	overlaps(): boolean
	{
		if(this.group1 === undefined || this.group2 === undefined)
		{
			return false;
		}

		// I'm sure there's a mathematical way to do this in a shorter term, but I can't be arsed! :)
		if(!(this.group1?.min > this.group2.max || this.group2?.min > this.group1?.max ))
		{
			return true;
		}

		return false;
	}
}

