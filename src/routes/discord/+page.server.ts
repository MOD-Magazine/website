import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	throw redirect(301, "https://discord.com/invite/9Dd7JBgVCS");
}
