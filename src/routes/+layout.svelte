<script lang="ts">
	import "../app.css";
	import Header from "$lib/Header.svelte";
	import Banner from "$lib/Banner.svelte";
	import { onMount } from "svelte";

	onMount(() => {
		let banner: HTMLDivElement = document.querySelector("#banner")!;
		let compensator: HTMLDivElement = document.querySelector("#banner-compensator")!;
		compensator.style.height = `${banner.clientHeight}px`;
	});
</script>

<Header />

<div>
	<main>
		<slot />
	</main>
</div>

<div id="banner-compensator" />

<Banner>
	Our website is still very much a WIP - watch this space. In the meantime, check out <a
		href="https://www.twitch.tv/modmagazinemc">our coverage of BlanketCon</a
	>
	or <a href="https://modmagazine.net/discord">join us on Discord</a>!
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
