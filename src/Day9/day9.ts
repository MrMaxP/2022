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
		const bound: Bound = this.getBounds();
		const grid = new Grid(bound);
		grid.simulate();

		const count: number = grid.countUsed();

		console.log("Spaces visited ", count);

		return count;
	}

	private Part2(): number
	{
		return 0;
	}

	private getBounds(): Bound
	{
		let bound: Bound = new Bound();

		let x: number = 0;
		let y: number = 0;

	for(const line of this.lines)
		{
			switch(line.charAt(0))
			{
				case 'U': y += Number.parseInt(line.substring(2)); break;
				case 'D': y -= Number.parseInt(line.substring(2)); break;
				case 'L': x -= Number.parseInt(line.substring(2)); break;
				case 'R': x += Number.parseInt(line.substring(2)); break;
			}

			console.log(line);

			bound.expand(x, y);
		}

		return bound;
	}
}

class Bound
{
	r: number = 0;
	l: number = 0;
	t: number = 0;
	b: number = 0;

	expand(x: number, y: number)
	{
		this.r = Math.max(this.r, x);
		this.l = Math.min(this.l, x);

		this.t = Math.max(this.t, y);
		this.b = Math.min(this.b, y);

		console.log(`Bound expanded to L:${this.l}, R:${this.r}, T:${this.t}, B:${this.b}`)
	}
}

class Grid
{
	x: number = 0;
	y: number = 0;
	w: number = 0;
	h: number = 0;
	grid: number[][] = [];

	constructor(bound: Bound)
	{
		this.w = bound.r - bound.l;
		this.h = bound.t - bound.b;

		this.x = -bound.l;
		this.y = -bound.b;

		for(let i: number = 0; i < this.h; i++)
		{
			this.grid[i] = [];
			for(let j: number = 0; j < this.w; j++)
			{
				this.grid[i][j] = 0;
			}
		}
	}

	simulate()
	{

	}

	countUsed(): number
	{
		let count: number = 0;

		for(let x: number = 0; x < this.w; x++)
		{
			for(let y: number = 0; y < this.h; y++)
			{
				if(this.grid[y][x] !== 0)
				{
					count++;
				}
			}
		}

		return count;
	}
}
