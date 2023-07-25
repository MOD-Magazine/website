<script>
	import Logo from "$lib/logo.svg?raw";
</script>

<header>
	<a id="logo-link" href="/" aria-hidden="true">
		<span class="logo">{@html Logo}</span>
	</a>
	<nav>
		<a href="/about"><span>About</span></a>
		<a href="/issues"><span>Articles</span></a>
		<a href="/contact"><span>Contact</span></a>
	</nav>
</header>

<style>
	header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0.75rem;
		background-color: #d1d5db;
		border-bottom: 0.1rem solid #1A0716;
	}

	nav {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 1.5rem;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
	}

	.logo {
		display: inline-block;
		height: 3.5rem;
	}

	:global(.logo svg) {
		height: 100%;
		width: 100%;
	}

	a:not(#logo-link) {
		width: 33.3%;
		text-align: center;
		text-transform: uppercase;
		text-decoration: none;
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text);
	}

	@media (min-width: 768px) {
		header {
			flex-direction: row;
			justify-content: space-between;
		}

		nav {
			width: auto;
		}
	}
</style>
