import { error, redirect } from "@sveltejs/kit";
import { parse as parseYaml } from "yaml";
import type { ArticleFrontmatter } from "$lib/types.d.ts";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	// Special casing for `/issues/april_23.pdf` for backwards compatibility
	if (params.path === "april_23.pdf") {
		throw redirect(301, "/legacy/april_23.pdf");
	}

	const text = await fetch(
		`https://raw.githubusercontent.com/MOD-Magazine/MOD-Magazine/main/issues/${params.path}.md`,
	).then((r) => r.text());
	const data = parseFrontmatter<ArticleFrontmatter>(text);
	let content = data.content;

	// Replace relative image links with absolute ones
	content.match(/assets\/.*[.]png/g)?.forEach((e) => {
		content = text.replace(
			e,
			"https://raw.githubusercontent.com/MOD-Magazine/MOD-Magazine/main/issues/" +
				params.path.split("/")[0] +
				"/" +
				e,
		);
	});

	if (data.frontmatter == null) {
		throw error(404, { message: "Article not found." });
	}

	if (data.frontmatter.title == null || data.frontmatter.author == null) {
		throw error(404, { message: "Article contained invalid frontmatter." });
	}

	return {
		markdown: text,
		author: data.frontmatter.author,
		title: data.frontmatter.title,
		coauthors: data.frontmatter.coauthors ?? [],
	};
}

function parseFrontmatter<T>(content: string): { frontmatter: T; content: string } {
	const frontmatter = content.split("---")[1];
	const text = content.split("---")[2];

	return {
		content: text,
		frontmatter: parseYaml(frontmatter),
	};
}
