<script lang="ts">
	import "../app.css";
	import Logo from "$lib/logo.svg?raw";
	import { onMount } from "svelte";
</script>

<svelte:head>
	<meta
		name="og:image"
		content="https://github.com/MOD-Magazine/branding/blob/main/logo.png?raw=true"
	/>
</svelte:head>

<header
	class="flex flex-col items-center justify-center p-3 bg-gray-200 border-b border-gray-400 md:px-8 md:justify-between md:flex-row"
>
	<a href="/" aria-hidden="true">
		<span class="inline-block logo h-14">{@html Logo}</span>
	</a>
	<nav class="flex justify-between w-full gap-6 py-1 md:w-auto">
		<a href="/about" class="w-1/3 text-2xl font-medium text-center uppercase"><span>About</span></a>
		<a href="/issues" class="w-1/3 text-2xl font-medium text-center uppercase"
			><span>Articles</span></a
		>
		<a href="/discord" class="w-1/3 text-2xl font-medium text-center uppercase"
			><span>Discuss</span></a
		>
	</nav>
</header>

<div class="flex flex-col items-center justify-center">
	<main class="flex flex-col w-full max-w-4xl p-5">
		<slot />
	</main>
</div>

<div class="h-24 md:h-12" />

<div class="fixed bottom-0 left-0 grid w-full p-2 place-items-start bg-mod-purple">
	<p class="w-full text-center text-white">
		Our website is still very much a WIP - watch this space. In the meantime, check out <a
			href="https://www.twitch.tv/modmagazinemc"
			class="underline">our coverage of BlanketCon</a
		>
		or <a href="https://modmagazine.net/discord" class="underline">join us on Discord</a>!
	</p>
</div>

<style>
	:global(.logo svg) {
		height: 100%;
		width: 100%;
	}
</style>
