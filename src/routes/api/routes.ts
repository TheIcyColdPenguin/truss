import type { RequestHandler } from '@sveltejs/kit';
import { readdir } from 'fs/promises';

export interface TutorialList {
	folderTitle: string;
	foldername: string;
	lessons: { file: string; title: string }[];
}

// @ts-ignore
export const GET: RequestHandler = async () => {
	return { body: await getRouteDetails() };
};

const toTitleCase = (str: string) => {
	const newStr = str.replace(/\..*$/, '').replace(/-/g, ' ');
	return newStr.charAt(0).toUpperCase() + newStr.slice(1);
};

const getRouteDetails = async () => {
	// get each folder
	const tutorialFolders = (await readdir('src/routes/tutorial')).filter((i) => !i.endsWith('.svx'));

	// get each tutorial file
	const tutorials: TutorialList[] = [];
	for (let i = 0; i < tutorialFolders.length; i++) {
		const folder = tutorialFolders[i];

		tutorials[i] = {
			foldername: folder,
			folderTitle: toTitleCase(folder),
			lessons: []
		};

		const files = await readdir(`src/routes/tutorial/${folder}`);

		for (const file of files) {
			if (file == 'index.svx') {
				continue;
			}

			tutorials[i].lessons.push({ title: toTitleCase(file), file: file.replace(/\.svx$/, '') });
		}
	}

	return tutorials;
};
