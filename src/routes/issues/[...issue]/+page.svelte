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
	/**
	 * @type {any[]}
	 */
	let coauthors = data.coauthors;
</script>

<h1>{title}</h1>

<div>
	<img class="author author_main" src="https://github.com/{author}.png" width="40px" alt={author} />
	<div class="tooltip_wrapper">
		<p class="tooltip tooltip_main">{author}</p>
	</div>
</div>

<div class="coauthors">
	{#each coauthors as c_author}
		<div>
			<img class="author" src="https://github.com/{c_author}.png" width="40px" alt={author} />
			<div class="tooltip_wrapper">
				<p class="tooltip">{c_author}</p>
			</div>
		</div>
	{/each}
</div>
<SvelteMarkdown source={markdown} />

<style>
	.author {
		border-radius: 100%;
	}
	.coauthors {
		display: flex;
	}
	.author:hover ~ .tooltip_wrapper > .tooltip {
		transition: 500ms linear;
		visibility: visible;
		opacity: 100;
	}
	.tooltip_wrapper {
		position: relative;
		width: 0;
		height: 0;
	}
	.tooltip {
		pointer-events: none;
		position: relative;
		border-radius: var(--border-radius);
		background-color: var(--primary);
		padding: 5px;
		font-size: small;
		color: white;
		transition: 500ms linear;
		opacity: 0;
		visibility: hidden;
		display: inline;
		bottom: 20px;
		left: 15px;
	}
	.author_main {
		width: 80px;
		height: 80px;
	}
	.tooltip_main {
		font-size: medium;
		bottom: 30px;
		left: 30px;
	}

	:global(blockquote) {
		border-left: 10px solid #1b2735c4;
		border-radius: var(--border-radius);
		padding-left: 10px;
	}
</style>
