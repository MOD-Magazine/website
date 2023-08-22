<script lang="ts">
	import Contributor from "../about/Contributor.svelte";

	export let data;
</script>

<svelte:head>
	<title>About | MOD! Magazine</title>
	<meta name="description" content="The magazine about all things modded Minecraft!" />
</svelte:head>

<h1>Meet the Team</h1>

<h3>Writers</h3>
<div>
	{#each data.writers as writer}
		<Contributor {...writer} />
	{/each}
</div>

<h3>Developers</h3>
<div>
	{#each data.developers as developer}
		<Contributor {...developer} />
	{/each}
</div>

<style>
	div {
		display: grid;
		gap: 1em;
		grid-template-columns: repeat(1, 1fr);
		padding: 1em;
	}

	@media (min-width: 1024px) {
		div {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
