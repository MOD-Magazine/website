<script lang="ts">
	import Contributor from "../about/Contributor.svelte";

	export let data;
</script>

<svelte:head>
	<title>About | MOD! Magazine</title>
	<meta name="description" content="The magazine about all things modded Minecraft!" />
</svelte:head>

<div class="mx-auto prose">
	<h1>About Us</h1>
	<p>
		MOD! is an attempt at a publication for all things modded Minecraft. We're still trying to get
		off the ground at the moment, so expect more in the future.
	</p>
	<p>
		Contributors are what fuels a project like this - and MOD! is running low on fuel. If you have
		some free-time, please consider joining us on the Discord server - no commitments of course.
	</p>
	
	<h1>Meet the Team</h1>
	
	<h2>Writers</h2>
	<div class="grid gap-4 p-4">
		{#each data.writers as writer}
		<Contributor {...writer} />
		{/each}
	</div>
	
	<h2>Developers</h2>
	<div class="grid gap-4 p-4">
		{#each data.developers as developer}
		<Contributor {...developer} />
		{/each}
	</div>
</div>
	
	<style>
		div {
			grid-template-columns: repeat(1, 1fr);
		}
		
		@media (min-width: 1024px) {
		div {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
