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

	const search = () => {
		if (searchQuery === "") {
			filteredArticles = [...articles];
		} else {
			filteredArticles = fuse.search(searchQuery).map((e) => e.item);
		}
	};

	const transformDate = (date: string) => {
		const [month, year] = date.split("-");
		// We're hardcoded to the 21st century. That's probably fine.
		// FIXME: update this in 2100 :>
		return `${month.charAt(0).toLocaleUpperCase() + month.slice(1)} 20${year}`;
	};
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/>

<svelte:head>
	<title>Articles | MOD! Magazine</title>
</svelte:head>

<div style="display: flex; padding-bottom: 0.75rem;">
	<!-- TODO: Use a custom component for this, I don't think we should need a library for it -->
	<Search
		hideLabel={true}
		bind:value={searchQuery}
		on:submit={search}
		on:type={search}
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
		<h1 class="divider">{transformDate(data.date)}</h1>

		{#each data.articles as article}
			<a class="entry" href={`/issues/${article.path}`}>
				<div class="article-preview">
					<h2>{article.title}</h2>
					<p>{article.summary}</p>
				</div>
			</a>
		{/each}
	</VirtualScroll>
{:else}
	<VirtualScroll data={filteredArticles} key="title" let:data pageMode={true}>
		<a class="entry" href={`/issues/${data.path}`}>
			<div class="article-preview">
				<h2>{data.title}</h2>
				<p>{data.summary}</p>
			</div>
		</a> article-preview
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

	.article-preview {
		border: 1px solid #1a0716;
		border-radius: 0.25rem;
		padding: 0.5rem;
		margin: 0.25rem 0;
	}

	:global([data-svelte-search] input) {
		width: 100%;
		font-size: 1rem;
		padding: 0.5rem;
		border: 1px solid var(--border-color);
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
		border: 1px solid var(--border-color);
		border-radius: 0px;
		border-left: none;
		border-right: none;
	}
	#close_button {
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius);
		border-bottom-left-radius: 0px;
		border-top-left-radius: 0px;
	}
</style>
