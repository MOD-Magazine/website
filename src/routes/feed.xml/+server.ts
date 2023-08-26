import type { Issue } from "$lib/types";

export async function GET() {
	const issues: Issue[] = await fetch(
		"https://raw.githubusercontent.com/MOD-Magazine/MOD-Magazine/main/issues/issues.json",
	).then((r) => r.json());
	const items = [];

	for (const issue of issues) {
		for (const article of issue.articles) {
			items.push(createItem({
				title: article.title,
				link: `https://modmagazine.net/issues/${article.path}`,
				description: article.summary,
				content: await fetch(article.raw_url)
					.then((r) => r.text())
					.then((t) => t.split("---")[2]),
				date: new Date(article.date),
			}));
		}
	}

	return new Response(createXml(items), {
		headers: {
			"content-type": "application/rss+xml",
		},
	});
}

function createXml(items: string[]): string {
	return `
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:media="http://search.yahoo.com/mrss/">
	<channel>
			<title>MOD! Magazine</title>
			<link>https://modmagazine.net/</link>
			<description>MOD! Magazine, the magazine about all things modded Minecraft.</description>
			<lastBuildDate>${new Date().toString()}</lastBuildDate>
			<language>en</language>
			<image>
					<title>MOD! Magazine</title>
					<url>https://raw.githubusercontent.com/MOD-Magazine/branding/main/logo.png</url>
					<link>https://modmagazine.net/</link>
			</image>
			<copyright>MOD! Magazine Contributors, 2023</copyright>
			${items.join("\n")}
	</channel>
</rss>
`;
}

function createItem(item: {
	title: string;
	link: string;
	description: string;
	content: string;
	date: Date;
}): string {
	return `
	<item>
			<title>${item.title}</title>
			<link>${item.link}</link>
			<description>${item.description}</description>
			<content:encoded><![CDATA[${item.content}]]></content:encoded>
			<pubDate>${item.date.toString()}</pubDate>
	</item>
`;
}
