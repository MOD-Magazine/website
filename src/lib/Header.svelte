<script>
	import Logo from "$lib/logo.svg?raw";
</script>

<header>
	<a href="/">
		<span class="logo">{@html Logo}</span>
	</a>
	<nav>
		<a href="/about">About</a>
		<a href="/issues">Articles</a>
		<a href="/contact">Contact</a>
	</nav>
</header>

<style>
	header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		background-color: var(--accent);
	}

	nav {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}

	.logo {
		display: inline-block;
		height: 3rem;
	}

	:global(.logo svg) {
		height: 100%;
		width: 100%;
	}

	a:not(.logo) {
		text-transform: uppercase;
		text-decoration: none;
		color: var(--text);
	}

	@media (min-width: 768px) {
		header {
			flex-direction: row;
			justify-content: space-between;
		}
	}
</style>
