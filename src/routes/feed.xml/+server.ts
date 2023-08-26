import type { Issue } from "$lib/types";
import { Feed } from "feed";

const feed = new Feed({
	title: "MOD! Magazine",
	description: "MOD! Magazine, the magazine about all things modded Minecraft.",
	id: "https://modmagazine.net/",
	link: "https://modmagazine.net/",
	language: "en",
	image: "https://raw.githubusercontent.com/MOD-Magazine/branding/main/logo.png",
	favicon: "https://modmagazine.net/favicon.ico",
	copyright: "MOD! Magazine Contributors, 2023"
});

export async function GET() {
	const issues: Issue[] = await fetch(
		"https://raw.githubusercontent.com/MOD-Magazine/MOD-Magazine/main/issues/issues.json",
	).then((r) => r.json());

	for (const issue of issues) {
		for (const article of issue.articles) {
			feed.addItem({
				title: article.title,
				id: `https://modmagazine.net/issues/${article.path}`,
				link: `https://modmagazine.net/issues/${article.path}`,
				description: article.summary,
				content: await fetch(article.raw_url).then((r) => r.text()).then((t) => t.split("---")[2]),
				date: new Date(article.date),
				author: [
					{
						name: article.author,
						link: `https://github.com/${article.author}`,
					},
					...(article.coauthors || []).map((author) => ({
						name: author,
						link: `https://github.com/${author}`,
					})),
				]
			});
		}
	}

	return new Response(feed.rss2(), {
		headers: {
			"content-type": "application/rss+xml",
		},
	});
}