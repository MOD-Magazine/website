<script lang="ts">
	import type { PageData } from "./$types";
	import twitch from "$lib/twitch.svg";
	import youtube from "$lib/youtube.png";

	export let data: PageData;

	let articles = data.articles;
</script>

<svelte:head>
	<title>MOD! Magazine</title>
	<meta name="description" content="The magazine about all things modded Minecraft!" />
</svelte:head>

<h2>MOD! - A News Publication for Modded Minecraft</h2>

<div class="icons">
	<a href="https://www.twitch.tv/modmagazinemc"><img src={twitch} alt="Twitch" /></a>
	<a href="https://www.youtube.com/channel/UCYglRn3xc7uLOUfzWH2-QWQ"
		><img src={youtube} alt="YouTube" /></a
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

<h2>Latest Articles</h2>
<div>
	{#each articles as article}
		<a href={`/issues/${article.path}`}
			><div class="article-preview">
				<h2>{article.title}</h2>
				<p>{article.summary}</p>
			</div></a
		>
	{/each}
	<a class="centered-text" href="/issues">See more</a>
</div>

<style>
	.icons {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.icons > a > img {
		height: 2rem;
		margin: 0 0.5rem;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.article-preview {
		border: 1px solid #1a0716;
		border-radius: 0.25rem;
		padding: 0.5rem;
		margin: 0.5rem 0;
	}

	.article-preview:hover {
		background-color: #e5e7eb;
	}

	.article-preview h2 {
		font-size: 1.2rem;
	}

	.article-preview p {
		font-size: 0.85rem;
	}
</style>
