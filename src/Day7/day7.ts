import path from 'path';
import fs from 'fs';
import assert from 'assert';

//const data = fs.readFileSync(path.join(__dirname, './test.txt'), 'utf-8');
const data = fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8');

export class Day7
{
	lines: string[] = data.split(/\r?\n/);
	root: Folder = new Folder("/", undefined);
	currentFolder: Folder = this.root;
	part1Total: number = 0;
	part2Folderist: Array<Folder> = new Array();

	public Run()
	{
		console.log("\n--- Day 7: No Space Left On Device ---");

		this.runCommands();

		this.accSizes(this.root);

//		this.Part1();
//		this.Part2();

		assert(this.Part1() === 1491614);
		assert(this.Part2() === 6400111);
	}

	private Part1(): number
	{
		this.part1Rec(this.root);

		console.log("Below 100,000 total ", this.part1Total);

		return this.part1Total;
	}

	private Part2(): number
	{
		const remain: number = 30000000 - (70000000 - this.root.totalSizeOfFiles);

		this.part2List(this.root);

		this.part2Folderist.sort((a: Folder, b: Folder) => {return a.totalSizeOfFiles - b.totalSizeOfFiles;});

		for(const f of this.part2Folderist)
		{
			if(f.totalSizeOfFiles > remain)
			{
				console.log("Dir size to free ", f.totalSizeOfFiles);

				return f.totalSizeOfFiles;
			}
		}

		return 0;
	}

	private part2List(folder: Folder)
	{
		this.part2Folderist.push(folder);
		folder.recurse(this.part2List.bind(this));
	}

	private part1Rec(folder: Folder)
	{
		if(folder.totalSizeOfFiles < 100000)
		{
			this.part1Total += folder.totalSizeOfFiles;
		}

		folder.recurse(this.part1Rec.bind(this));
	}

	private printFolderSizes(folder: Folder)
	{
		folder.recurse(this.printFolderSizes.bind(this));
	}

	private accSizes(folder: Folder)
	{
		folder.totalSizeOfFiles += folder.recurse(this.accSizes.bind(this));
	}

	private runCommands()
	{

		for(const line of this.lines)
		{
			if(line.startsWith("$"))
			{
				// command
				if(line.startsWith("$ cd"))
				{
					const folder: string = line.substring(5);
					this.currentFolder = this.cd(folder);
				}
				else if(line.startsWith("$ ls"))
				{
					// We can ignore this as we know this is allways followed by dir's and files and always comes after a cd
				}
			}
			else
			{
				if(line.startsWith("dir"))
				{
					this.currentFolder.addFolder(new Folder(line.substring(4), this.currentFolder));
				}
				else
				{
					const sizeName: string[] = line.split(" ");
					this.currentFolder.addFile(new File(sizeName[1], Number.parseInt(sizeName[0])));
				}
			}
		}

		this.currentFolder = this.root;
	}

	private cd(folderName: string): Folder
	{
		if(folderName === '/')
		{
			return this.root;
		}
		else if(folderName === '..')
		{
			return this.currentFolder.parent as Folder;
		}

		for(const folder of this.currentFolder.folders)
		{
			if(folder.name === folderName)
			{
				return folder;
			}
		}

		// Should never get here
		// Normally we'd assert or handle the error, but since we know our data is always valid, don't bother.

		return this.root;
	}
}

class File
{
	name: string;
	size: number;

	constructor(name: string, size: number)
	{
		this.name = name;
		this.size = size;
	}
}

class Folder
{
	name: string;
	totalSizeOfFiles: number = 0;
	parent: Folder | undefined;

	folders: Array<Folder> = new Array();
	files: Array<File> = new Array();

	constructor(name: string, parent: Folder | undefined)
	{
		this.name = name;
		this.parent = parent;
	}

	addFile(file: File)
	{
		this.files.push(file);
		this.totalSizeOfFiles += file.size;
	}

	addFolder(folder: Folder)
	{
		this.folders.push(folder);
	}

	recurse(callback: Function): number
	{
		let childrenSizes: number = 0;

		for(const folder of this.folders)
		{
			callback(folder);
 			childrenSizes += folder.totalSizeOfFiles;
		}

		return childrenSizes;
	}
}