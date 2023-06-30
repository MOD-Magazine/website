/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	const json = await fetch(
		'https://raw.githubusercontent.com/MOD-Magazine/MOD-Magazine/main/issues/issues.json'
	);

	return {
		json: await json.json()
	};
}

export const ssr = false;
