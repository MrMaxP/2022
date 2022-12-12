import path from 'path';
import fs from 'fs';
import assert from 'assert';

//const data = fs.readFileSync(path.join(__dirname, './test.txt'), 'utf-8');
const data = fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8');

export class Day5
{
	lines: string[] = data.split(/\r?\n/);
	moves: Array<Move> = new Array();
	stacks: Array<string> = new Array();

	public Run()
	{
		console.log("\n--- Day 5: ---");

		this.getMoves();

		// this.Part1();
		// this.Part2();

		assert(this.Part1() === "ZRLJGSCTR");
		assert(this.Part2() === "PRTTGRFPB");
	}

	private Part1(): string
	{
		this.buildStack();
		this.executeMoves9000();

		const tops: string = this.getStacksTop();

		console.log("CrateMover 9000 = ", tops);

		return tops;
	}

	private Part2(): string
	{
		this.buildStack();
		this.executeMoves9001();

		const tops: string = this.getStacksTop();

		console.log("CrateMover 9001 = ", tops);

		return tops;
	}

	private getStacksTop(): string
	{
		let tops: string = "";

		for(const s in this.stacks)
		{
			tops += this.stacks[s].substring(this.stacks[s].length - 1);
		}

		return tops;
	}

	private buildStack()
	{
		this.stacks = new Array();

		for(const line of this.lines)
		{
			let index: number = 1;
			let stack: number = 0;

			if(line.charAt(index) === '1')
			{
				return;
			}

			while(index < line.length)
			{
				if(line.charAt(index) !== ' ')
				{
					if(this.stacks[stack] === undefined)
					{
						this.stacks[stack] = line.charAt(index);
					}
					else
					{
						this.stacks[stack] = line.charAt(index) + this.stacks[stack];
					}
				}

				index += 4;
				stack++;
			}
		}
	}

	private executeMoves9000()
	{
		for(const move of this.moves)
		{
			const stack: string = this.stacks[move.from];
			const start: string = stack.substring(0, stack.length - move.count);
			const end: string = this.reverseString(stack.substring(stack.length - move.count));

			this.stacks[move.from] = start;
			this.stacks[move.to] += end;
		}
	}

	private executeMoves9001()
	{
		for(const move of this.moves)
		{
			const stack: string = this.stacks[move.from];
			const start: string = stack.substring(0, stack.length - move.count);
			const end: string = stack.substring(stack.length - move.count);

			this.stacks[move.from] = start;
			this.stacks[move.to] += end;
		}
	}

	private reverseString(str: string)
	{
		let newString: string = "";

		for (let i: number = str.length - 1; i >= 0; i--)
		{
			newString += str[i];
		}

		return newString;
	}

	private getMoves()
	{
		for(const line of this.lines)
		{
			if(line.startsWith("move"))
			{
				this.moves.push(new Move(line));
			}
		}
	}
}

class Move
{
	count: number = 0;
	from: number = 0;
	to: number = 0;

	constructor(move: string)
	{
		const split = move.split(" ");

		this.count = Number.parseInt(split[1]);
		this.from = Number.parseInt(split[3]) - 1;	// Make stack index zero relative
		this.to = Number.parseInt(split[5]) - 1;
	}
}

