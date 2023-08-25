<script lang="ts">
	import type { ArticleFrontmatter } from "./types";

	export let article: ArticleFrontmatter;
</script>

<div class="flex flex-col w-full h-full">
	<h2>{article.title}</h2>
	<p>{article.summary}</p>
</div>
