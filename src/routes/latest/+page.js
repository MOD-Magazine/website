import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load() {
    // TODO: not hardcoded
    throw redirect(301, '/issues/june-2023')
}