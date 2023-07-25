<script lang="ts">
	import type { PageData } from "./$types";

    export let data: PageData;

    let articles = data.articles;
</script>

{#each articles as article}
    <div class="article-preview">
        <h2>{article.title}</h2>
        <p>{article.summary}</p>
    </div>
{/each}

<style>
    .article-preview {
        border: 1px solid black;
        padding: 0.5rem;
        margin: 0.1rem;
    }

    .article-preview h2 {
        font-size: 1.2rem;
    }

    .article-preview p {
        font-size: 0.85rem;
    }
</style>
