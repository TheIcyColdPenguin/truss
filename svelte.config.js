import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	extensions: ['.svelte', '.mdx', '.svx', '.scss'],
	preprocess: [preprocess({ scss: true }), mdsvex({ layout: './src/components/layout.svelte' })],

	kit: {
		adapter: adapter()
	}
};

export default config;
