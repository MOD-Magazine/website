<script>
	import { VirtualScroll } from 'svelte-virtual-scroll-list';

	/** @type {import('./$types').PageData} */
	export let data;
	let list;

	/**
	 * @type {{ uniqueKey: number; data: any; }[]}
	 */
	const things = [];
	let i = 0;
	Array.from(data.json.issues).forEach((element) => {
		things.push({ uniqueKey: i, data: element });
		i++;
	});
</script>

<VirtualScroll bind:this={list} data={things} key="uniqueKey" let:data pageMode={true}>
	{#if data.data.divider != null}
		<h1 class="divider">{data.data.divider}</h1>
	{:else}
		<a class="entry" href={data.data.url}>
			<h3 style="margin-left:20px">{data.data.name}</h3>
			<p style="margin-left:40px">{data.data.info}</p>
		</a>
	{/if}
</VirtualScroll>

<style>
	.divider {
		opacity: 75%;
		color: darkslategray;
	}
	.entry {
		text-decoration: none;
		color: black;
	}
</style>
