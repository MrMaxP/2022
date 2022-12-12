import path from 'path';
import fs from 'fs';
import assert from 'assert';

const data = fs.readFileSync(path.join(__dirname, './test.txt'), 'utf-8');
//const data = fs.readFileSync(path.join(__dirname, './data.txt'), 'utf-8');

export class Day7
{
	lines: string[] = data.split(/\r?\n/);
	root: Folder = new Folder("/", undefined);
	currentFolder: Folder = this.root;

	public Run()
	{
		console.log("\n--- Day 7: No Space Left On Device ---");

		this.runCommands();

		this.Part1();
		this.Part2();

//		assert(this.Part1() === 70509);
//		assert(this.Part2() === 208567);
	}

	private Part1(): number
	{
		// travers the folder structure and calculate accumulated sizes - finding folders <= 100,000

		this.printFolderSizes(this.root);

		this.accSizes(this.root);

		this.printFolderSizes(this.root);

		return 0;
	}

	private Part2(): number
	{
		return 0;
	}

	private printFolderSizes(folder: Folder)
	{
		console.log("Folder ", folder.name, " - ", folder.totalSizeOfFiles);
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
			console.log("cd /");
			return this.root;
		}
		else if(folderName === '..')
		{
			console.log("cd .. to ", this.currentFolder.parent?.name);
			return this.currentFolder.parent as Folder;
		}

		for(const folder of this.currentFolder.folders)
		{
			if(folder.name === folderName)
			{
				console.log("cd ", folder.name);
				return folder;
			}
		}

		// Should never get here
		// Normally we'd assert or handle the error, but since we know our data is always valid, don't bother.

		console.log("ERROR changing to none existant folder!");

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

		console.log("Adding file ", file.name, ":", file.size, " to folder ", this.name, " - total folder size ", this.totalSizeOfFiles);
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
			childrenSizes += folder.totalSizeOfFiles;
			callback(folder);
		}

		return childrenSizes;
	}
}