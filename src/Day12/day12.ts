import path from 'path';
import fs from 'fs';
import assert from 'assert';

const data = fs.readFileSync(path.join(__dirname, './test.txt'), 'utf-8');
//const data = fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8');

export class Day12
{
	lines: string[] = data.split(/\r?\n/);
	width: number = 0;
	height: number = 0;
	start: Pos = {x:0, y:0};
	end: Pos = {x:0, y:0};
	map: Node[][] = [];
	stack: Array<Pos> = new Array();
	minMoves: number = 99999999;

	public Run()
	{
		console.log("\n--- Day 12: Hill Climbing Algorithm ---");

		this.BuildMap();

		this.Walk(this.end);

		console.log("Min moves ", this.minMoves);

		this.Part1();
		this.Part2();

//		assert(this.Part1() === 70509);
//		assert(this.Part2() === 208567);
	}

	private BuildMap()
	{
		this.width = this.lines[0].length;
		this.height = this.lines.length;

		for(let y=0; y<this.height; y++)
		{
			this.map[y] = [];

			for(let x=0; x<this.width; x++)
			{
				if(this.lines[y].charAt(x) === 'S')
				{
					this.start = {x:x, y:y};
					this.map[y][x] = new Node(x, y, 0);
				}
				else if(this.lines[y].charAt(x) === 'E')
				{
					this.end = {x:x, y:y};
					this.map[y][x] = new Node(x, y, 25);
				}
				else
				{
					this.map[y][x] = new Node(x, y, this.lines[y].charCodeAt(x) - 'a'.charCodeAt(0));
				}
			}
		}
	}

	private Walk(pos: Pos)
	{
		let thisNode: Node = this.GetNode(pos);

		this.stack.push(pos);

		for(; thisNode.dir < 4; thisNode.dir++)
		{
			thisNode.visited = true;

			let nextNode: Node | undefined = this.GetNodeInDir(thisNode);

			if(nextNode !== undefined)
			{
				if(!nextNode.visited && (nextNode.height === thisNode.height-1 || nextNode.height >= thisNode.height))
				{
					if(nextNode.pos.x === this.start.x && nextNode.pos.y === this.start.y)
					{
						console.log("Found Start after ", this.stack.length, " moves");

						if(this.minMoves > this.stack.length)
						{
							this.minMoves = this.stack.length;
							this.Display();
						}
						return;
					}

//					console.log("Moving from ", thisNode.pos, " to ", nextNode.pos);
					this.Walk(nextNode.pos);
//					console.log("Fallback to ", thisNode.pos);
				}
			}
		}

		this.stack.pop();
	}

	private Part1(): number
	{
		return 0;
	}

	private Part2(): number
	{
		return 0;
	}

	private Display()
	{
		let lines: string[] = [];
		let stack: Array<Pos> = [...this.stack];

		for(let y=0; y<this.height; y++)
		{
			let line: string = ".".repeat(this.width);
			lines[y] = line;
		}

		let thisPos: Pos | undefined = stack.pop();
		let lastPos: Pos = {x:thisPos !== undefined ? thisPos.x : 0, y:thisPos !== undefined ? thisPos.y : 0};

		while((thisPos = stack.pop()) !== undefined)
		{
			if(thisPos.x === lastPos.x && thisPos.y > lastPos.y)
				lines[thisPos.y] = lines[thisPos.y].substring(0, thisPos.x) + "^" + lines[thisPos.y].substring(thisPos.x+1);
			else if(thisPos.x === lastPos.x && thisPos.y < lastPos.y)
				lines[thisPos.y] = lines[thisPos.y].substring(0, thisPos.x) + "v" + lines[thisPos.y].substring(thisPos.x+1);
			else if(thisPos.y === lastPos.y && thisPos.x > lastPos.x)
				lines[thisPos.y] = lines[thisPos.y].substring(0, thisPos.x) + ">" + lines[thisPos.y].substring(thisPos.x+1);
			else if(thisPos.y === lastPos.y && thisPos.x < lastPos.x)
				lines[thisPos.y] = lines[thisPos.y].substring(0, thisPos.x) + "<" + lines[thisPos.y].substring(thisPos.x+1);

			lastPos = {x:thisPos !== undefined ? thisPos.x : 0, y:thisPos !== undefined ? thisPos.y : 0};
		}

		for(let y=0; y<this.height; y++)
		{
			console.log(lines[y]);
		}
	}

	private GetNode(pos: Pos): Node
	{
		return this.map[pos.y][pos.x];
	}

	private GetNodeInDir(node: Node): Node | undefined
	{
		let pos: Pos = {x:node.pos.x, y:node.pos.y};
		switch(node.dir)
		{
			case 0:	pos.y--; break;
			case 1:	pos.x++; break;
			case 2:	pos.y++; break;
			case 3:	pos.x--; break;
			default: return undefined;
		}

		if(pos.x === -1 || pos.y === -1 || pos.x >= this.width || pos.y >= this.height)
		{
			return undefined
		}

		return this.map[pos.y][pos.x];
	}
}

class Pos
{
	x: number = 0;
	y: number = 0;
}

class Node
{
	pos: Pos = new Pos();
	dir: number = 0;
	paths: boolean[] = [true, true, true, true];
	height: number = 0;
	visited: boolean = false;

	constructor(x: number, y: number, height: number)
	{
		this.pos.x = x;
		this.pos.y= y;
		this.height = height;
	}
}
