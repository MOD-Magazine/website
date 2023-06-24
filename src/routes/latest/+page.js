import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const issues = JSON.parse(await (await fetch('https://raw.githubusercontent.com/MOD-Magazine/MOD-Magazine/main/Issues/issues.json')).text());

	//Get latest non-divider issue
	let index = 0;
	// Untill Divider is null and url is not null increment index
	while (!(issues.issues[index].divider == null && issues.issues[index].url != null)) {
		index++;
	}
	throw redirect(301, issues.issues[index].url);
}
