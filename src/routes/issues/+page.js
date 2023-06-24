/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const text = await fetch('https://raw.githubusercontent.com/MOD-Magazine/MOD-Magazine/Issues/issues.json');
	return {
		json: JSON.parse(await text.text())
	};
}
export const ssr = false;
