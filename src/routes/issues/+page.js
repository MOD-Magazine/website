/** @type {import('./$types').PageLoad} */
export async function load({fetch,params}) {
    const text = await fetch("test/test_issues.json");
    return{
        json: JSON.parse(await text.text())
    }
}
export const ssr = false;