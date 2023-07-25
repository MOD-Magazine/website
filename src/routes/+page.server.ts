import type { ArticleFrontmatter, Issue } from "$lib/types";

/** @type {import('./$types').PageServerLoad} */
export async function load(): Promise<{ articles: ArticleFrontmatter[] }> {
    const issues: Issue[] = await fetch(
        "https://raw.githubusercontent.com/MOD-Magazine/MOD-Magazine/main/issues/issues.json",
    ).then((r) => r.json());

    const articles: ArticleFrontmatter[] = [];

    for (let i = 0; i < 3; i++) {
        if (issues[0].articles[i] != null) {
            articles.push(issues[0].articles[i]);
        }
    }

    return {
        articles,
	};
}
