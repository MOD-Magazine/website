<script>
	import Search from 'svelte-search';
	import { VirtualScroll } from 'svelte-virtual-scroll-list';
	import Fuse from 'fuse.js';

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
	 * @type {{ uniqueKey: any; data: any; }[]}
	 */
	let things = [];
	let i = 0;
	Array.from(data.json.issues).forEach((element) => {
		things.push({
			uniqueKey: i,
			data: element
		});
		i++;
	});
	let newthings = [...things];

	//New Search
	const search_engine = new Fuse(things, {
		keys: ['data.name', 'data.info']
	});
	const search = () => {
		if (value == '') newthings = [...things];
		else {
			newthings = [];
			search_engine.search(value).forEach((e) => {
				newthings.push(e.item);
			});
		}
	};
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/>

<div style="display: flex;">
	<Search
		hideLabel={true}
		bind:value
		on:submit={search}
		label="Search: "
		placeholder="Search here."
	/>

	<button on:click={search} id="search_button" class="material-symbols-outlined"> search </button>
	<button
		on:click={() => {
			newthings = [...things];
			value = '';
		}}
		id="close_button"
		class="material-symbols-outlined"
	>
		close
	</button>
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
		color: var(--accent);
	}
	.entry {
		text-decoration: none;
		color: black;
	}
	:global([data-svelte-search] input) {
		width: 100%;
		font-size: 1rem;
		padding: 0.5rem;
		border: 1px dashed var(--border-color);
		border-radius: var(--border-radius);
		border-bottom-right-radius: 0px;
		border-top-right-radius: 0px;
	}
	/* stupid clear button*/
	:global([data-svelte-search] input)::-webkit-search-decoration,
	:global([data-svelte-search] input)::-webkit-search-cancel-button {
		--webkit-appearance: none;
		appearance: none;
	}
	:global([data-svelte-search] input)::-ms-clear {
		display: none;
		width: 0;
		height: 0;
	}
	:global([data-svelte-search] input)::-ms-reveal {
		display: none;
		width: 0;
		height: 0;
	}
	#search_button {
		border: 1px dashed var(--border-color);
		border-radius: 0px;
		border-left: none;
		border-right: none;
	}
	#close_button {
		border: 1px dashed var(--border-color);
		border-radius: var(--border-radius);
		border-bottom-left-radius: 0px;
		border-top-left-radius: 0px;
	}
</style>
