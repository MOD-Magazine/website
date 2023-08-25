<script lang="ts">
	import "../app.css";
	import Header from "./Header.svelte";
	import Banner from "./Banner.svelte";
	import { onMount } from "svelte";

	onMount(() => {
		let banner: HTMLDivElement = document.querySelector("#banner")!;
		let compensator: HTMLDivElement = document.querySelector("#banner-compensator")!;
		compensator.style.height = `${banner.clientHeight}px`;
	});
</script>

<svelte:head>
	<meta
		name="og:image"
		content="https://github.com/MOD-Magazine/branding/blob/main/logo.png?raw=true"
	/>
</svelte:head>

<Header />

<div>
	<main>
		<slot />
	</main>
</div>

<div id="banner-compensator" />

<Banner>
	<p>
		Our website is still very much a WIP - watch this space. In the meantime, check out <a
			href="https://www.twitch.tv/modmagazinemc"
			class="underline">our coverage of BlanketCon</a
		>
		or <a href="https://modmagazine.net/discord" class="underline">join us on Discord</a>!
	</p>
</Banner>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1.25em;
		width: 100%;
		max-width: 960px;
	}
</style>
