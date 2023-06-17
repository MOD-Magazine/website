<script>
	import Search from 'svelte-search';
	import { VirtualScroll } from 'svelte-virtual-scroll-list';

	/** @type {import('./$types').PageData} */
	export let data;
	
	/**
	 * @type {VirtualScroll}
	 */
	let list;

	/**
	 * @type {string}
	 */
	let value;

	/**
	 * @type {any}
	 */
	let vh1;

	/**
	 * @type {{ uniqueKey: string; data: any; }[]}
	 */
	const things = [];

	let i = 0;
	Array.from(data.json.issues).forEach((element) => {
		if (element.divider == null)
			things.push({
				uniqueKey: element.name + ' ' + element.info,
				data: element
			});
		else things.push({ uniqueKey: element.divider, data: element });
		i++;
	});
	let newthings = [...things];

	//search
	const getTerms = (/** @type {{ uniqueKey: string; }} */ e) => e.uniqueKey;
	const submit = () => {
		newthings = [...things];
		things.forEach((e) => {
			if (!getTerms(e).toLowerCase().includes(value.toLowerCase())) {
				const index = newthings.indexOf(e);
				if (index > -1) {
					newthings.splice(index, 1);
				}
			}
		});
	};
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/>

<div style="display: flex;">
	<Search
		hideLabel={true}
		bind:height={vh1}
		bind:value
		on:submit={submit}
		label="Search: "
		placeholder="Search here."
	/>
	<button on:click={submit} id="search_button" class="material-symbols-outlined"> search </button>
</div>

<VirtualScroll bind:this={list} data={newthings} key="uniqueKey" let:data pageMode={true}>
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
	:global([data-svelte-search] input) {
		width: 100%;
		font-size: 1rem;
		padding: 0.5rem;
		border: 1px dashed #a8a8a8;
		border-radius: 0.25rem;
		border-bottom-right-radius: 0px;
		border-top-right-radius: 0px;
	}
	#search_button {
		border: 1px dashed #a8a8a8;
		border-radius: 0.25rem;
		border-bottom-left-radius: 0px;
		border-top-left-radius: 0px;
		border-left: none;
	}
</style>
