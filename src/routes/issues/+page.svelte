<script lang="ts">
	import Search from "svelte-search";
	import Fuse from "fuse.js";
	import { VirtualScroll } from "svelte-virtual-scroll-list";
	import type { PageData } from "./$types";

	export let data: PageData;
	let issues = data.issues;
	let searchQuery: string;

	const articles = issues.flatMap((i) => i.articles);
	let filteredArticles = [...articles];

	const fuse = new Fuse(articles, {
		keys: ["title", "summary"],
	});

	const search = () => (filteredArticles = fuse.search(searchQuery).map((e) => e.item));
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/>

<div style="display: flex;">
	<!-- TODO: Use a custom component for this, update results on type -->
	<Search
		hideLabel={true}
		bind:value={searchQuery}
		on:submit={search}
		label="Search: "
		placeholder="Search here."
	/>

	<button on:click={search} id="search_button" class="material-symbols-outlined">Search</button>
	<button
		on:click={() => {
			filteredArticles = [...articles];
			searchQuery = "";
		}}
		id="close_button"
		class="material-symbols-outlined"
	>
		Close
	</button>
</div>

{#if searchQuery === ""}
	<VirtualScroll data={issues} key="date" let:data pageMode={true}>
		<h1 class="divider">{data.date}</h1>

		{#each data.articles as article}
			<a class="entry" href={`/issues/${article.path}`}>
				<h3 style="margin-left:20px">{article.title}</h3>
				<p style="margin-left:40px">{article.summary}</p>
			</a>
		{/each}
	</VirtualScroll>
{:else}
	<VirtualScroll data={filteredArticles} key="title" let:data pageMode={true}>
		<a class="entry" href={`/issues/${data.path}`}>
			<h3 style="margin-left:20px">{data.title}</h3>
			<p style="margin-left:40px">{data.summary}</p>
		</a>
	</VirtualScroll>
{/if}

<style>
	.divider {
		color: var(--accent);
	}
	.entry {
		text-decoration: none;
		color: black;
	}
	:global([data-svelte-search] input) {
		width: 100%;
		font-size: 1rem;
		padding: 0.5rem;
		border: 1px dashed var(--border-color);
		border-radius: var(--border-radius);
		border-bottom-right-radius: 0px;
		border-top-right-radius: 0px;
	}
	/* stupid clear button*/
	:global([data-svelte-search] input)::-webkit-search-decoration,
	:global([data-svelte-search] input)::-webkit-search-cancel-button {
		--webkit-appearance: none;
		appearance: none;
	}
	:global([data-svelte-search] input)::-ms-clear {
		display: none;
		width: 0;
		height: 0;
	}
	:global([data-svelte-search] input)::-ms-reveal {
		display: none;
		width: 0;
		height: 0;
	}
	#search_button {
		border: 1px dashed var(--border-color);
		border-radius: 0px;
		border-left: none;
		border-right: none;
	}
	#close_button {
		border: 1px dashed var(--border-color);
		border-radius: var(--border-radius);
		border-bottom-left-radius: 0px;
		border-top-left-radius: 0px;
	}
</style>
