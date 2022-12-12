import path from 'path';
import fs from 'fs';
import assert from 'assert';
import { findSourceMap } from 'module';
import { debug } from 'console';

//const data = fs.readFileSync(path.join(__dirname, './test.txt'), 'utf-8');
const data = fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8');

export class Day6
{
	lines: string[] = data.split(/\r?\n/);
	counts: number[] = [];

	public Run()
	{
		console.log("\n--- Day 6: Tuning Trouble ---");

//		this.Part1();
//		this.Part2();

		assert(this.Part1() === 1542);
		assert(this.Part2() === 3153);
	}

	private Part1(): number
	{
		const index: number = this.findUnique(4);

		console.log("Start of packet = ", index);

		return index;
	}

	private Part2(): number
	{
		const index: number = this.findUnique(14);

		console.log("Start of message = ", index);

		return index;
	}

	private findUnique(runLen: number): number
	{
		const line = this.lines[0];

		this.counts = [];
		for(let i=0; i<26; i++)
		{
			this.counts[i] = 0;
		}

		for(let index: number=0; index<line.length; index++)
		{
			this.counts[line.charCodeAt(index) - 'a'.charCodeAt(0)]++;

			if(index - runLen >= 0)
			{
				this.counts[line.charCodeAt(index-runLen) - 'a'.charCodeAt(0)]--;
			}

			if(this.checkUniqueness(runLen))
			{
				return index + 1;
			}
		}

		return 0;
	}

	private checkUniqueness(runLen: number): boolean
	{
		for(const count of this.counts)
		{
			if(count === 1)
			{
				runLen--;
			}
			else if(count > 1)
			{
				return false;
			}
		}

		return runLen === 0;
	}
}

