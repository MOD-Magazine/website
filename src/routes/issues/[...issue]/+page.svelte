<script>
	import SvelteMarkdown from 'svelte-markdown';
	/** @type {import('./$types').PageData} */
	export let data;

	/**
	 * @type {string}
	 */
	const markdown = data.markdown;
	let title = data.title;

	const author = data.author;
</script>

<h1>{title}</h1>
<div id="ma">
	<img id="main_author" src="https://github.com/{author}.png" width="40px" alt={author} />
	<p id="ma_tooltip">{author}</p>
</div>
<SvelteMarkdown source={markdown} />

<style>
	#main_author {
		border-radius: 100%;
	}
	#main_author:hover ~ #ma_tooltip {
		transition: 500ms linear;
		visibility: visible;
		opacity: 100;
	}
	#ma_tooltip {
		position: relative;
		right: 30px;
		border-radius: var(--border-radius);
		background-color: var(--primary);
		padding: 5px;
		font-size: xx-small;
		color: white;
		transition: 500ms linear;
		opacity: 0;
		visibility: hidden;
		display: inline;
	}
	:global(blockquote) {
		border-left: 10px solid #1b2735c4;
		border-radius: var(--border-radius);
		padding-left: 10px;
	}
</style>
