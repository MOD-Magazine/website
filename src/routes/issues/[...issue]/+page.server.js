// Special casing for `/issues/april_23.pdf` for backwards compatibility

import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    if (params.issue === "april_23.pdf") {
        throw redirect(301, "/legacy/april_23.pdf");
    } else {
        return;
    }
}