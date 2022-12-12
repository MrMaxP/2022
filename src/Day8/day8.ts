import path from 'path';
import fs from 'fs';
import assert from 'assert';
import { threadId } from 'worker_threads';

//const data = fs.readFileSync(path.join(__dirname, './test.txt'), 'utf-8');
const data = fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8');

export class Day8
{
	lines: string[] = data.split(/\r?\n/);

	width: number = this.lines[0].length;
	height: number = this.lines.length;
	size: number = this.width;

	visibleTrees: number = 0;

	public Run()
	{
		console.log("\n--- Day 8: Treetop Tree House ---");

//		this.Part1();
//		this.Part2();

		assert(this.Part1() === 1870);
		assert(this.Part2() === 517440);
	}

	private Part1(): number
	{
		const visibleTrees: number = this.computeVisibility();

		console.log("Visible tree count ", visibleTrees);

		return visibleTrees;
	}

	private Part2(): number
	{
		let total: number = 0;

		for(let y = 0; y < this.size; y++)
		{
			for(let x = 0; x < this.size; x++)
			{
				total = Math.max(total, this.scoreTree(x, y));
			}
		}

		console.log("Highest scoring tree ", total);

		return total;
	}

	private scoreTree(x: number, y: number): number
	{
		// early out from anything on the edge as they always score 0
		if(x === 0 || y === 0 || x === this.size - 1 || y === this.size - 1)
		{
			return 0;
		}

		let treeHeight: number = this.getTreeHeight(x, y);

		let treeDistXP = this.size - x - 1;
		for(let i = x+1; i < this.size; i++)
		{
			if(this.getTreeHeight(i, y) >= treeHeight)
			{
				treeDistXP = i - x;
				break;
			}
		}

		let treeDistXN = x;
		for(let i = x-1; i >= 0; i--)
		{
			if(this.getTreeHeight(i, y) >= treeHeight)
			{
				treeDistXN = x - i;
				break;
			}
		}

		let treeDistYP = this.size - y - 1;
		for(let i = y+1; i < this.size; i++)
		{
			if(this.getTreeHeight(x, i) >= treeHeight)
			{
				treeDistYP = i - y;
				break;
			}
		}

		let treeDistYN = y;
		for(let i = y-1; i >= 0; i--)
		{
			if(this.getTreeHeight(x, i) >= treeHeight)
			{
				treeDistYN = y - i;
				break;
			}
		}

		const score: number = treeDistXP *  treeDistXN * treeDistYP *  treeDistYN;

		return score;
	}

	private getTreeHeight(x: number, y: number): number
	{
		return this.lines[y]. charCodeAt(x) - '0'.charCodeAt(0);
	}

	private computeVisibility()
	{
		let countedGrid: number[][] = [];

		for(let y = 0; y < this.size; y++)
		{
			countedGrid[y] = [];
			for(let x = 0; x < this.size; x++)
			{
				countedGrid[y][x] = 0;
			}
		}

		for(let o: number = 0; o < this.size; o++)
		{
			let treeMax: number[] = [0, 0, 0, 0];

			for(let i: number = 0; i < this.size; i++)
			{
				if(this.lines[o].charCodeAt(i) > treeMax[0])
				{
					treeMax[0] = this.lines[o].charCodeAt(i);
					countedGrid[o][i]++;
				}

				if(this.lines[o].charCodeAt(this.size - i - 1) > treeMax[1])
				{
					treeMax[1] = this.lines[o].charCodeAt(this.size - i - 1);
					countedGrid[o][this.size - i - 1]++;
				}

				if(this.lines[i].charCodeAt(o) > treeMax[2])
				{
					treeMax[2] = this.lines[i].charCodeAt(o);
					countedGrid[i][o]++;
				}

				if(this.lines[this.size - i - 1].charCodeAt(o) > treeMax[3])
				{
					treeMax[3] = this.lines[this.size - i - 1].charCodeAt(o);
					countedGrid[this.size - i - 1][o]++;
				}
			}
		}

		let total: number = 0;
		for(let y = 0; y < this.size; y++)
		{
			for(let x = 0; x < this.size; x++)
			{
				if(countedGrid[y][x] !== 0)
				{
					total++;
				}
			}
		}

		return total;
	}
}

