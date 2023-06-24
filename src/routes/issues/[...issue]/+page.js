import frontmatter from 'frontmatter';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const request = await fetch(
		'https://raw.githubusercontent.com/MOD-Magazine/MOD-Magazine/main/Issues/' +
			params.issue +
			'.md'
	);
	let frontmatter_unparsed = await request.text();
	const fm_parsed = frontmatter(frontmatter_unparsed, { safeLoad: true });

	let text = fm_parsed.content;

	text.match(/assets\/.*[.]png/g)?.forEach((e) => {
		text = text.replace(
			e,
			'https://raw.githubusercontent.com/MOD-Magazine/MOD-Magazine/main/Issues/' +
				params.issue.split('/')[0] +
				'/' +
				e
		);
	});
	let data;
	if (fm_parsed.data == null) data = { author: 'ghost', title: '404: Not found', coauthors: [] };
	else {
		data = fm_parsed.data;
	}
	if (data.author == null) data.author = 'Ghost';
	if (data.coauthors == null) data.coauthors = [];
	if (data.title == null) data.title = '404: Not Found';

	return {
		markdown: text,
		author: data.author,
		title: data.title,
		coauthors: data.coauthors
	};
}
