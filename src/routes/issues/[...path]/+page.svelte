<script lang="ts">
	import SvelteMarkdown from "svelte-markdown";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<h1>{data.title}</h1>

<article class="prose"><SvelteMarkdown source={data.text} /></article>

<div style="padding-top: 1rem;">
	<img
		class="author author_main"
		src="https://github.com/{data.author}.png"
		width="40px"
		alt={`avatar of ${data.author}`}
	/>
	<div class="tooltip_wrapper">
		<p class="tooltip tooltip_main">{data.author}</p>
	</div>
</div>

<div class="coauthors">
	{#each data.coauthors as coAuthor}
		<div>
			<img
				class="author"
				src="https://github.com/{coAuthor}.png"
				width="40px"
				alt={`avatar of ${coAuthor}`}
			/>
			<div class="tooltip_wrapper">
				<p class="tooltip">{coAuthor}</p>
			</div>
		</div>
	{/each}
</div>

<style>
	.author {
		border-radius: 100%;
	}

	.coauthors {
		display: flex;
	}

	.author:hover ~ .tooltip_wrapper > .tooltip {
		transition: 100ms linear;
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
</style>
