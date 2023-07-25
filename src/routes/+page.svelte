<script lang="ts">
	import type { PageData } from "./$types";

    export let data: PageData;

    let articles = data.articles;
</script>

{#each articles as article}
    <a href={`/issues/${article.path}`}><div class="article-preview">
        <h2>{article.title}</h2>
        <p>{article.summary}</p>
    </div></a>
{/each}

<style>
    .article-preview {
        border: 1px solid black;
        border-radius: 0.25rem;
        padding: 0.5rem;
        margin: 0.25rem 0;
    }

    .article-preview:hover {
        background-color: #e5e7eb;
    }

    .article-preview h2 {
        font-size: 1.2rem;
    }

    .article-preview p {
        font-size: 0.85rem;
    }
</style>
