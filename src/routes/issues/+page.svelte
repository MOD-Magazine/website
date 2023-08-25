<script lang="ts">
	import Fuse from "fuse.js";
	import { VirtualScroll } from "svelte-virtual-scroll-list";
	import type { PageData } from "./$types";
	import Search from "$lib/Search.svelte";

	export let data: PageData;
	let issues = data.issues;
	let query: string;

	const articles = issues.flatMap((i) => i.articles);
	let filteredArticles = [...articles];

	const fuse = new Fuse(articles, {
		keys: ["title", "summary"],
	});

	const search = () => {
		if (query === "") {
			filteredArticles = [...articles];
		} else {
			filteredArticles = fuse.search(query).map((e) => e.item);
		}
	};

	const transformDate = (date: string) => {
		const [month, year] = date.split("-");
		// We're hardcoded to the 21st century. That's probably fine.
		// FIXME: update this in 2100 :>
		return `${month.charAt(0).toLocaleUpperCase() + month.slice(1)} 20${year}`;
	};
</script>

<svelte:head>
	<title>Articles | MOD! Magazine</title>
	<meta name="description" content="The magazine about all things modded Minecraft!" />
</svelte:head>

<Search bind:value={query} on:updated={search} />

{#if query === ""}
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

	.article-preview {
		border: 1px solid #1a0716;
		border-radius: 0.25rem;
		padding: 0.5rem;
		margin: 0.25rem 0;
	}
</style>
