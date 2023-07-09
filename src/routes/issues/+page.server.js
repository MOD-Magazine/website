/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	/**
	 * @type {{ date: string, articles: { raw_url: string, path: string, title: string, author: string, coauthors: string[], summary: string }[] }[]}
	 */
	const json = await (await fetch(
		"https://raw.githubusercontent.com/MOD-Magazine/MOD-Magazine/main/issues/issues.json"
	)).json();

	return {
		json,
	};
}

export const ssr = false;
