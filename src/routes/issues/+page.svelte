<script>
	import Search from 'svelte-search';
	import Fuse from 'fuse.js';
	import { VirtualScroll } from 'svelte-virtual-scroll-list';

	/** @type {import('./$types').PageData} */
	export let data;

	/**
	 * @type {string}
	 */
	let value;
	
	/**
	 * @type {{ uniqueKey: any; data: any; }[]}
	 */
	let articles = data.json.flatMap((i, idx) => {
		let month = i.date.split('-')[0];
		let year = i.date.split('-')[1];
		let divider = month[0].toUpperCase() + month.slice(1) + ' ' + year;
		let result = [{ uniqueKey: idx, data: { divider } }];
		result = result.concat(i.articles.map((a, idx) => ({ uniqueKey: `article-${idx}`, data: a })));
		return result;
	});
	let searchedArticles = [...articles];

	const search_engine = new Fuse(articles, {
		keys: ['data.title', 'data.summary']
	});

	const search = () => {
		if (value == '') searchedArticles = [...articles];
		else {
			searchedArticles = [];
			search_engine.search(value).forEach((e) => {
				searchedArticles.push(e.item);
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

	<button on:click={search} id="search_button" class="material-symbols-outlined">search</button>
	<button
		on:click={() => {
			searchedArticles = [...articles];
			value = '';
		}}
		id="close_button"
		class="material-symbols-outlined"
	>
		close
	</button>
</div>

<VirtualScroll data={searchedArticles} key="uniqueKey" let:data pageMode={true}>
	{#if data.data.divider != null}
		<h1 class="divider">{data.data.divider}</h1>
	{:else}
		<a class="entry" href={`/issues${data.data.path}`}>
			<h3 style="margin-left:20px">{data.data.title}</h3>
			<p style="margin-left:40px">{data.data.summary}</p>
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
