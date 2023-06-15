<script>
    import '../app.css';
    import Header from '$lib/Header.svelte';
</script>

<Header/>

<div>
    <main>
        <slot />
    </main>
</div>

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
</style>