import type { Issue } from "$lib/types";

/** @type {import('./$types').PageServerLoad} */
export async function load(): Promise<{ issues: Issue[] }> {
	return {
		issues: await fetch(
			"https://raw.githubusercontent.com/MOD-Magazine/MOD-Magazine/main/issues/issues.json",
		).then((r) => r.json()),
	};
}

export const ssr = false;
