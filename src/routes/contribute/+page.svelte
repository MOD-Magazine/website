<script>
	import Contributor from './Contributor.svelte';

    export let data;
</script>

<h1>Contribute</h1>

<p>Help us</p>

<h3>Writers</h3>
{#each data.writers as writer}
    <Contributor {...writer} />
{/each}

<h3>Developers</h3>
{#each data.writers as writer}
    <Contributor {...writer} />
{/each}