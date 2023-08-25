<script lang="ts">
	import Fuse from "fuse.js";
	import { VirtualScroll } from "svelte-virtual-scroll-list";
	import type { PageData } from "./$types";
	import Search from "./Search.svelte";
	import ArticleCard from "$lib/ArticleCard.svelte";

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
		<h1 class="pb-2 text-4xl text-mod-accent">{transformDate(data.date)}</h1>
		<div class="pl-2">
			<div class="absolute w-2 h-2 -translate-x-1 bg-gray-300 rounded-full" />
			<div class="flex flex-col pl-2 space-y-4 border-l border-gray-400">
				{#each data.articles as article}
					<a href={`/issues/${article.path}`}>
						<ArticleCard {article} />
					</a>
				{/each}
			</div>
		</div>
	</VirtualScroll>
{:else}
	<VirtualScroll data={filteredArticles} key="title" let:data pageMode={true}>
		<a href={`/issues/${data.path}`}>
			<div>
				<h2>{data.title}</h2>
				<p>{data.summary}</p>
			</div>
		</a>
	</VirtualScroll>
{/if}
