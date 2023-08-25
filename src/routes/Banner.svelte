<script lang="ts">
</script>

<div id="banner">
	<slot />
</div>

<style>
	div {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 0.5rem;
		display: grid;
		place-items: center;
		text-align: center;
		color: white;
		background-color: var(--primary);
	}
</style>
