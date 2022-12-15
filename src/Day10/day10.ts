import path from 'path';
import fs from 'fs';
import assert from 'assert';

//const data = fs.readFileSync(path.join(__dirname, './test.txt'), 'utf-8');
const data = fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8');

export class Day10
{
	lines: string[] = data.split(/\r?\n/);

	public Run()
	{
		console.log("\n--- Day 10: Cathode-Ray Tube ---");

//		this.Part1();
//		this.Part2();

		assert(this.Part1() === 16020);
		assert(this.Part2() === 0);
	}

	private Part1(): number
	{
		const signalStrength: number = this.simulate();
		console.log("Signal strengths = ", signalStrength);

		return signalStrength;
	}

	private Part2(): number
	{
		console.log("Display-");
		this.crt();

		return 0;
	}

	private crt()
	{
		let X: number = 1;
		let cycle: number = 1;

		let scanlines: string[] = [];

		for(let l: number=0; l<6; l++)
		{
			scanlines[l] = " ".repeat(40);
		}

		for(const line of this.lines)
		{
			if(line.startsWith("noop"))
			{
				this.checkSprite(cycle, X, scanlines);
				cycle += 1;
			}
			else if(line.startsWith("addx"))
			{
				this.checkSprite(cycle, X, scanlines);
				cycle += 1;

				this.checkSprite(cycle, X, scanlines);
				cycle += 1;

				const split: string[] = line.split(" ");
				X += Number.parseInt(split[1]);
			}
		}

		for(let l: number=0; l<6; l++)
		{
			console.log(scanlines[l]);
		}
	}

	private checkSprite(cycle: number, X: number, scanlines: string[])
	{
		const line: number = Math.floor(cycle/40);
		const pixel: number = cycle%40;

		// console.log("Line ", line);
		// console.log("Pixel ", pixel);
		// console.log("X is ", X);
		// console.log("");

		if(pixel === X || pixel === X + 1 || pixel === X + 2)
		{
			scanlines[line] = scanlines[line].substring(0, pixel) + '#' + scanlines[line].substring(pixel+1);
		}
	}

	private simulate(): number
	{
		let X: number = 1;
		let cycle: number = 1;

		let monitor: number = 20;
		let signalAcc: number = 0;

		for(const line of this.lines)
		{
			if(line.startsWith("noop"))
			{
				cycle += 1;
			}
			else if(line.startsWith("addx"))
			{
				const split: string[] = line.split(" ");
				X += Number.parseInt(split[1]);
				cycle += 2;
			}

			if(cycle + 1 >= monitor)
			{
				const signalStrength: number = X * monitor;

//				console.log("Signal strength at ", monitor, "(cycle ", cycle, ") is ", signalStrength);

				signalAcc += signalStrength;

				monitor += 40;
			}
		}

		return signalAcc;
	}
}

