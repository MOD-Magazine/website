<script lang="ts">
	import SvelteMarkdown from "svelte-markdown";
	import { page } from "$app/stores";
	import type { PageData } from "./$types";

	let url = $page.url.pathname;

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.title} | MOD! Magazine</title>
	<meta name="description" content={data.summary} />
	<meta name="author" content={data.author} />
	<meta property="og:title" content={`${data.title} | MOD! Magazine Article`} />
	<meta property="og:description" content={data.summary} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={`https://modmagazine.net/${url}`} />
	<meta property="og:site_name" content="MOD! Magazine" />
	<meta property="og:locale" content="en_US" />
</svelte:head>

<h1 class="pb-4 text-center">{data.title}</h1>

<article class="mx-auto prose"><SvelteMarkdown source={data.text} /></article>

<div class="flex items-center pt-8 mx-auto">
	<img
		class="w-16 h-16 rounded-full"
		src="https://github.com/{data.author}.png"
		width="40px"
		alt={`avatar of ${data.author}`}
	/>
	<div class="pl-2">
		<h3>{data.author}</h3>
		<p>Author</p>
	</div>
</div>

{#if data.coauthors.length > 0}
<div class="pt-3 border-t border-gray-400">
	{#each data.coauthors as coauthor}
	<div class="flex items-center pt-8 mx-auto">
		<img
			class="w-12 h-12 rounded-full"
			src="https://github.com/{coauthor}.png"
			width="40px"
			alt={`avatar of ${coauthor}`}
		/>
		<div class="pl-2">
			<h3>{coauthor}</h3>
			<p>Co-Author</p>
		</div>
	</div>
	
	{/each}
</div>
{/if}

<style>
	.coauthors {
		display: flex;
	}

	.author_main {
		width: 80px;
		height: 80px;
	}
</style>
