import path from 'path';
import fs from 'fs';
import assert, { ifError } from 'assert';

const data = fs.readFileSync(path.join(__dirname, './test.txt'), 'utf-8');
//const data = fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8');

export class Day11
{
	lines: string[] = data.split(/\r?\n/);
	monkeys: Array<Monkey> = new Array();

	public Run()
	{
		console.log("\n--- Day 11: Monkey in the Middle ---");

		this.Part1();
		this.Part2();

//		assert(this.Part1() === 10605);
//		assert(this.Part2() === 14457296882);
	}

	private Part1(): number
	{
		this.monkeys = new Array();
		this.MakeMonkeyArray();

		return this.RunRounds(20);
	}

	private Part2(): number
	{
		this.monkeys = new Array();
		this.MakeMonkeyArray();

		return this.RunRounds(1000);
	}

	private RunRounds(runCount: number): number
	{
		for(let r=0; r<runCount; r++)
		{
			this.ProcessRound();
			this.PrintMonkeyStates(r);
		}

		const inspectionCounts: Array<number> = new Array();

		for(let n: number = 0; n<this.monkeys.length; n++)
		{
			console.log("Monkey ", n, " inspected items ", this.monkeys[n].inspectionCount, " times.");
			inspectionCounts.push(this.monkeys[n].inspectionCount);
		}

		inspectionCounts.sort((a: number, b: number) => b - a);

		const monkeyBusiness: number = inspectionCounts[0] * inspectionCounts[1];

		console.log("Monkey business = ", monkeyBusiness);

		return monkeyBusiness;
	}

	private PrintMonkeyStates(round: number)
	{
		let n = 0;
		console.log("After round ", round + 1, "the monkeys are holding items with these worry levels:");

		for(let n: number = 0; n<this.monkeys.length; n++)
		{
			console.log("Monkey ", n, ": ", this.monkeys[n].items.toString());
		}


	}

	private ProcessRound()
	{
		for(const monkey of this.monkeys)
		{
			while(monkey.items.length !== 0)
			{
				const item: bigint | undefined = monkey.items.shift();

				let worry = monkey.operate(item as bigint);
				worry = monkey.divideWorry(worry);

				const monkeyToThrowTo: number = monkey.throwTo(worry);

				this.monkeys[monkeyToThrowTo].items.push(worry);
			}
		}
	}

	private MakeMonkeyArray()
	{
		for(let l=0; l<this.lines.length; l++)
		{
			// Assume the input is well formatted
			if(this.lines[l].startsWith("Monkey"))
			{
				const monkey: Monkey = new Monkey();

				const items: string[] = this.lines[l+1].substring(18).split(", ");
				for(const i of items)
				{
					monkey.items.push(BigInt(Number.parseInt(i)));
				}

				const op: string[] = this.lines[l+2].substring(19).split(" ");
				monkey.opValues[0] = op[0] === 'old' ? BigInt(-1) : BigInt(Number.parseInt(op[0]));
				monkey.opValues[1] = op[2] === 'old' ? BigInt(-1) : BigInt(Number.parseInt(op[2]));

				monkey.operand = op[1]  === '+' ? 0 : 1;

				monkey.divisible = BigInt(Number.parseInt(this.lines[l+3].substring(21)));
				monkey.trueMonkey = Number.parseInt(this.lines[l+4].substring(29));
				monkey.falseMonkey = Number.parseInt(this.lines[l+5].substring(30));

				l += 6;

				this.monkeys.push(monkey);
			}
		}
	}
}

class Monkey
{
	items: Array<bigint> = new Array();
	opValues: bigint[] = [BigInt(-1), BigInt(-1)];
	operand: number = 0;
	divisible: bigint = BigInt(0);
	trueMonkey: number = 0;
	falseMonkey: number = 0;
	inspectionCount: number = 0;

	public operate(worry: bigint) : bigint
	{
		this.inspectionCount++;

		const left: bigint = this.opValues[0] === BigInt(-1) ? worry : this.opValues[0];
		const right: bigint = this.opValues[1] === BigInt(-1) ? worry : this.opValues[1];

		if(this.operand === 0)
		{
			return left + right;
		}
		else
		{
			return left * right;
		}
	}

	public divideWorry(worry: bigint): bigint
	{
		return worry / BigInt(3);
	}

	public isDivisible(worry: bigint): boolean
	{
		return (worry % this.divisible) === BigInt(0);
	}

	public throwTo(worry: bigint)
	{
		if(this.isDivisible(worry))
		{
			return this.trueMonkey;
		}
		else
		{
			return this.falseMonkey;
		}
	}
}

