import path from 'path';
import fs from 'fs';
import assert from 'assert';

//const data = fs.readFileSync(path.join(__dirname, './test.txt'), 'utf-8');
const data = fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8');

export class Day9
{
	lines: string[] = data.split(/\r?\n/);
	bound: Bound = this.getBounds();

	public Run()
	{
		console.log("\n--- Day 9: Rope Bridge ---");

		// this.Part1();
		// this.Part2();

		assert(this.Part1() === 5683);
		assert(this.Part2() === 2372);
	}

	private Part1(): number
	{
		const grid: Grid = new Grid(this.bound);

		grid.tailLen = 1;
		grid.clear();
		grid.simulate(this.lines);

		const count: number = grid.countUsed();

		console.log("Spaces visited small rope ", count);

		return count;
	}

	private Part2(): number
	{
		const grid: Grid = new Grid(this.bound);

		grid.tailLen = 9;
		grid.clear();
		grid.simulate(this.lines);

		const count: number = grid.countUsed();

		console.log("Spaces visited long rope ", count);

		return count;
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

//			console.log(line);

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

//		console.log(`Bound expanded to L:${this.l}, R:${this.r}, T:${this.t}, B:${this.b}`)
	}
}

class Grid
{
	public tailLen: number = 1;

	snakeX: number[] = [];
	snakeY: number[] = [];

	w: number = 0;
	h: number = 0;
	grid: number[][] = [];

	constructor(bound: Bound)
	{
		this.w = (bound.r - bound.l) + 1;
		this.h = (bound.t - bound.b) + 1;

		for(let i=0; i<10; i++)
		{
			this.snakeX[i] = -bound.l;
			this.snakeY[i] = -bound.b;
		}

		for(let i: number = 0; i < this.h; i++)
		{
			this.grid[i] = [];
			for(let j: number = 0; j < this.w; j++)
			{
				this.grid[i][j] = 0;
			}
		}
	}

	clear()
	{
		for(let i: number = 0; i < this.h; i++)
		{
			for(let j: number = 0; j < this.w; j++)
			{
				this.grid[i][j] = 0;
			}
		}

	}

	simulate(lines: string[])
	{
		this.displayGrid();

		for(const line of lines)
		{
//			console.log(line);

			switch(line.charAt(0))
			{
				case 'U': this.moveHead(0, Number.parseInt(line.substring(2))); break;
				case 'D': this.moveHead(0, -Number.parseInt(line.substring(2))); break;
				case 'L': this.moveHead(-Number.parseInt(line.substring(2)), 0); break;
				case 'R': this.moveHead(Number.parseInt(line.substring(2)), 0); break;
			}
		}
	}

	moveHead(x: number, y: number)
	{
		let loop: number = Math.abs(x + y);
		let addX: number = x === 0 ? 0 : x > 0 ? 1 : -1;
		let addY: number = y === 0 ? 0 : y > 0 ? 1 : -1;

		while(loop--)
		{
			this.snakeX[0] += addX;
			this.snakeY[0] += addY;

			this.moveTail();

			this.displayGrid();
		}
	}

	moveTail()
	{
		for(let i=0; i<this.tailLen; i++)
		{
			const xDiff = this.snakeX[i] - this.snakeX[i+1];
			const yDiff = this.snakeY[i] - this.snakeY[i+1];

			if(Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1)
			{
				let addX: number = xDiff === 0 ? 0 : xDiff > 0 ? 1 : -1;
				let addY: number = yDiff === 0 ? 0 : yDiff > 0 ? 1 : -1;

				this.snakeX[i+1] += addX;
				this.snakeY[i+1] += addY;
			}
		}

		this.grid[this.snakeY[this.tailLen]][this.snakeX[this.tailLen]]++;
	}

	displayGrid()
	{
		return;

		console.log("");

		for(let y: number = 0; y < this.h; y++)
		{
			let line: string = "" + y + " - ";
			for(let x: number = 0; x < this.w; x++)
			{

				if(this.snakeX[0] == x && this.snakeY[0] == y)
				{
					line += 'H';
				}
				else
				{
					let plotted: boolean = false;
					for(let i=1; i<this.tailLen; i++)
					{
						if(this.snakeX[i] == x && this.snakeY[i] == y)
						{
							line += '' + i;
							plotted = true;
							break;
						}
					}

					if(!plotted)
					{
//						line += '.';
						line += this.grid[y][x] === 0 ? '.' : '#';
					}
				}

			}

			console.log();
			console.log(line);
		}
	}

	countUsed(): number
	{
		let count: number = 0;

		for(let y: number = 0; y < this.h; y++)
		{
			for(let x: number = 0; x < this.w; x++)
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
