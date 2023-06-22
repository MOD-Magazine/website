import frontmatter from 'frontmatter'

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const request = await fetch('https://raw.githubusercontent.com/MOD-Magazine/MOD-Magazine/main/Issues/'+params.issue);
	let frontmatter_unparsed = await request.text()
	const fm_parsed = frontmatter(frontmatter_unparsed , { safeLoad: true });
	
	let text=fm_parsed.content;

	text.match(/assets\/.*[.]png/g)?.forEach(e=>{
		text=text.replace(e,"https://raw.githubusercontent.com/MOD-Magazine/MOD-Magazine/main/Issues/"+params.issue.split("/")[0]+"/"+e)
	})
	let data = fm_parsed.data;

	return{
		markdown: text,
		fm: fm_parsed?.data
	}
}