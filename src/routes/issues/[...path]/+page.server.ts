import { error, redirect } from "@sveltejs/kit";
import type { ArticleFrontmatter } from "$lib/types.d.ts";
import { parseFrontmatter } from "$lib/frontmatter";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	// Special casing for `/issues/april_23.pdf` for backwards compatibility
	if (params.path === "april_23.pdf") {
		throw redirect(301, "/legacy/april_23.pdf");
	}

	const rawText = await fetch(
		`https://raw.githubusercontent.com/MOD-Magazine/MOD-Magazine/main/issues/${params.path}.md`,
	).then((r) => r.text());
	const data = parseFrontmatter<ArticleFrontmatter>(rawText);
	let content = data.content;

	// Replace relative image links with absolute ones
	content.match(/\.?\/assets\/.*[.]png/g)?.forEach((e) => {
		content = content.replace(
			e,
			"https://raw.githubusercontent.com/MOD-Magazine/MOD-Magazine/main/issues/" +
				params.path.split("/")[0] +
				"/" +
				e,
		);
	});

	if (data.frontmatter.image) {
		data.frontmatter.image.match(/\.?\/assets\/.*[.]png/g)?.forEach((e) => {
			data.frontmatter.image = (data.frontmatter.image || "").replace(
				e,
				"https://raw.githubusercontent.com/MOD-Magazine/MOD-Magazine/main/issues/" +
				params.path.split("/")[0] +
				"/" +
				e,
			);
		});
	}


	if (data.frontmatter == null) {
		throw error(404, { message: "Article not found." });
	}

	if (data.frontmatter.title == null || data.frontmatter.author == null) {
		throw error(404, { message: "Article contained invalid frontmatter." });
	}

	return {
		text: content,
		author: data.frontmatter.author,
		title: data.frontmatter.title,
		summary: data.frontmatter.summary ?? "",
		image: data.frontmatter.image ?? null,
		coauthors: data.frontmatter.coauthors ?? [],
	};
}
