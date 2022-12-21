import path from 'path';
import fs from 'fs';
import assert from 'assert';

//const data = fs.readFileSync(path.join(__dirname, './test.txt'), 'utf-8');
const data = fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8');

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

		this.Part1();
		this.Part2();

//		assert(this.Part1() === 2864);
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

		const dirStack: Array<Node | undefined> = new Array();

		for(let dir: number = 0; dir < 4; dir++)
		{
			let dirNode: Node | undefined = this.GetNodeInDir(thisNode, dir);
			dirStack.push(dirNode);
		}

		dirStack.sort((a, b) => {

			if(a === undefined && b === undefined)
			{
				return 0;
			}
			else if(a === undefined && b !== undefined)
			{
				return 1;
			}
			else if(a !== undefined && b === undefined)
			{
				return -1;
			}
			else
			{
				// Favour one lower first
				if(a !== undefined && b !== undefined)
				{
					if(a.height === thisNode.height - 1)
					{
						return -100;
					}
					else if(b.height === thisNode.height - 1)
					{
						return 100;
					}

					return(b as Node).height - (a as Node).height;
				}
			}

			return 0;
		});

		for(const nextNode of dirStack)
		{
			thisNode.visited = true;

			if(nextNode === undefined || nextNode.visited || nextNode.height < thisNode.height - 1)
			{
				continue;
			}

			if(nextNode.height === thisNode.height-1 || nextNode.height >= thisNode.height)
			{
				if(nextNode.pos.x === this.start.x && nextNode.pos.y === this.start.y)
				{
					this.stack.push(nextNode.pos);

					console.log("Found Start after ", this.stack.length - 1, " moves");

					if(this.minMoves > this.stack.length - 1)
					{
						this.minMoves = this.stack.length - 1;
						this.Display();
					}
					return;
				}

//					console.log("Moving from ", thisNode.pos, " to ", nextNode.pos);
				this.Walk(nextNode.pos);
//					console.log("Fallback to ", thisNode.pos);
			}
		}

		const poppedPos: Pos | undefined = this.stack.pop();

		if(poppedPos !== undefined)
		{
			const poppedNode = this.GetNode(poppedPos);

			if(poppedNode !== undefined)
			{
				poppedNode.visited = false;
			}
		}

	}

	private Part1(): number
	{
		this.Walk(this.end);

		console.log("Min moves ", this.minMoves);

		return this.minMoves;
	}

	private Part2(): number
	{
		return 0;
	}

	private Display()
	{
		const simple: boolean = true;

		let lines: string[] = [];
		let stack: Array<Pos> = [...this.stack];

		for(let y=0; y<this.height; y++)
		{
			let line: string = "";
			for(let x=0; x<this.width; x++)
			{
				if(simple)
				{
					line += ".";
				}
				else
				{
					line += " ." + this.map[y][x].height.toString().padStart(2, '0');
				}
			}
			lines[y] = line;
		}

		let thisPos: Pos | undefined = stack.pop();
		let nextPos: Pos | undefined = {x:thisPos !== undefined ? thisPos.x : 0, y:thisPos !== undefined ? thisPos.y : 0};

		while((nextPos = stack.pop()) !== undefined && thisPos !== undefined)
		{
			let x: number = thisPos.x;
			let y: number = thisPos.y;

			if(simple)
			{
				const p: number = 1;

				if(x === nextPos.x && y > nextPos.y)
					lines[y] = lines[y].substring(0, x * p) + "^" + lines[y].substring((x+1) * p);
				else if(x === nextPos.x && y < nextPos.y)
					lines[y] = lines[y].substring(0, x * p) + "v" + lines[y].substring((x+1) * p);
				else if(y === nextPos.y && x > nextPos.x)
					lines[y] = lines[y].substring(0, x * p) + "<" + lines[y].substring((x+1) * p);
				else if(y === nextPos.y && x < nextPos.x)
					lines[y] = lines[y].substring(0, x * p) + ">" + lines[y].substring((x+1) * p);
			}
			else
			{
				const p: number = 4;

				if(x === nextPos.x && y > nextPos.y)
					lines[y] = lines[y].substring(0, x * p) + " ^" + this.map[y][x].height.toString().padStart(2, '0') + lines[y].substring((x+1) * p);
				else if(x === nextPos.x && y < nextPos.y)
					lines[y] = lines[y].substring(0, x * p) + " v" + this.map[y][x].height.toString().padStart(2, '0') + lines[y].substring((x+1) * p);
				else if(y === nextPos.y && x > nextPos.x)
					lines[y] = lines[y].substring(0, x * p) + " <" + this.map[y][x].height.toString().padStart(2, '0') + lines[y].substring((x+1) * p);
				else if(y === nextPos.y && x < nextPos.x)
					lines[y] = lines[y].substring(0, x * p) + " >" + this.map[y][x].height.toString().padStart(2, '0') + lines[y].substring((x+1) * p);
			}


			thisPos = {x:nextPos !== undefined ? nextPos.x : 0, y:nextPos !== undefined ? nextPos.y : 0};
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

	private GetNodeInDir(node: Node, dir: number): Node | undefined
	{
		let pos: Pos = {x:node.pos.x, y:node.pos.y};
		switch(dir)
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
