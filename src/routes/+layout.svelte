<script lang="ts">
	import "../app.css";
	import Header from "$lib/Header.svelte";
</script>

<Header />

<div>
	<main>
		<slot />
	</main>
</div>

<footer>
	<p><a href="https://github.com/MOD-Magazine/website">Open Source</a></p>
	<p>© MOD! Magazine 2023</p>
</footer>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1.25em;
		width: 100%;
		max-width: 960px;
	}

	footer{
		font-size: small;
		text-align: center;
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}
</style>
