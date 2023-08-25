<script lang="ts">
	import Gallery from "./Gallery.svelte";

	interface MarkedListItem {
		type: "list_item";
		raw: string;
		text: string;
	}

	export let items: MarkedListItem[] = [];
	export let ordered = false;
	export let start = 1;

	let images = items.filter((item) => item.text.trim().match(/!\[(.*)\]\((.*)\)/));
	let gallery = !ordered && images.length === items.length;

	const getUrl = (image: MarkedListItem) => {
		const [_, alt, src] = image.text.trim().match(/!\[(.*)\]\((.*)\)/)!;
		return { src, alt };
	};
</script>

{#if gallery}
	<Gallery images={images.map(getUrl)} />
{:else if ordered}
	<ol {start}><slot /></ol>
{:else}
	<ul><slot /></ul>
{/if}
