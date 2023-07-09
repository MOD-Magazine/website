<script>
	import Contributor from "./Contributor.svelte";

	export let data;
</script>

<svelte:head>
	<title>MOD - Contribute</title>
	<meta name="description" content="Contribute to the MOD! Magazine project" />
</svelte:head>

<h1>Contribute</h1>

<p>You can help us too!</p>
<p>Filler text about steps to contribute</p>
<p>Filler text about steps to contribute</p>
<p>Filler text about steps to contribute</p>
<p>Filler text about steps to contribute</p>
<p>Filler text about steps to contribute</p>
<p>Filler text about steps to contribute</p>
<p>Filler text about steps to contribute</p>

<p>Join the discord</p>

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
