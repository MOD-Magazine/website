<script>
	import { redirect } from '@sveltejs/kit';
	import SvelteMarkdown from 'svelte-markdown';
	import { dataset_dev } from 'svelte/internal';
		/** @type {import('./$types').PageData} */
        export let data;

        	/**
	 * @type {string}
	 */
        const markdown = data.markdown;
		const frontmatter = data.fm
		//@ts-ignore
		const title = frontmatter.title

</script>

<h1>{title}</h1>
<SvelteMarkdown source={markdown} />
