<script lang="ts">
	import type { PageData } from "./$types";
	import twitch from "$lib/twitch.svg";
	import youtube from "$lib/youtube.png";
	import ArticleCard from "$lib/ArticleCard.svelte";

	export let data: PageData;

	let articles = data.articles;
</script>

<svelte:head>
	<title>MOD! Magazine</title>
	<meta name="description" content="The magazine about all things modded Minecraft!" />
</svelte:head>

<h1 class="font-bold text-center">MOD! - A News Publication for Modded Minecraft</h1>

<div class="flex items-center justify-center">
	<a href="https://www.twitch.tv/modmagazinemc"
		><img class="h-8 my-3 mr-4" src={twitch} alt="Twitch" /></a
	>
	<a href="https://www.youtube.com/channel/UCYglRn3xc7uLOUfzWH2-QWQ"
		><img class="h-8" src={youtube} alt="YouTube" /></a
	>
</div>

<blockquote>
	MOD! Magazine is a news publication for modded Minecraft. We cover the latest news, updates, and
	releases for the modded Minecraft community.
</blockquote>

<br />

<p>
	Please excuse our dust, we are still working things out and hence have not finalized our website
	or article process. If you share our vision and want to help with MOD!, please come and chat on
	Discord.
</p>
<br />

<h1>Latest Articles</h1>
<div class="flex flex-col pl-2 space-y-2">
	<div class="absolute w-2 h-2 -translate-x-1 bg-gray-300 rounded-full" />
	<div class="flex flex-col pl-2 space-y-4 border-l border-gray-400">
		{#each articles as article}
			<a href={`/issues/${article.path}`}>
				<ArticleCard {article} />
			</a>
		{/each}
	</div>
	<a class="text-xl" href="/issues">See more</a>
</div>
