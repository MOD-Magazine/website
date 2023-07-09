import { redirect } from "@sveltejs/kit";
import frontmatter from "frontmatter";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	// Special casing for `/issues/april_23.pdf` for backwards compatibility
	if (params.path === "april_23.pdf") {
		throw redirect(301, "/legacy/april_23.pdf");
	} else {
		const request = await fetch(
			`https://raw.githubusercontent.com/MOD-Magazine/MOD-Magazine/main/issues/${params.path}.md`
		);
		const fm = frontmatter(await request.text(), { safeLoad: true });
		let text = fm.content;

		text.match(/assets\/.*[.]png/g)?.forEach((e) => {
			text = text.replace(
				e,
				"https://raw.githubusercontent.com/MOD-Magazine/MOD-Magazine/main/issues/" +
					params.path.split("/")[0] +
					"/" +
					e
			);
		});

		let data = fm.data ?? { author: "ghost", title: "404: Not found", coauthors: [] };

		if (data.author == null) data.author = "Ghost";
		if (data.coauthors == null) data.coauthors = [];
		if (data.title == null) data.title = "404: Not Found";

		return {
			markdown: text,
			author: data.author,
			title: data.title,
			coauthors: data.coauthors
		};
	}
}
