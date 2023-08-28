import { parse as parseYaml } from "yaml";

export function parseFrontmatter<T>(
	content: string,
	issueNumber: string,
): { frontmatter: T; content: string } {
	const frontmatter = content.split("---")[1];
	let text = content.split("---").slice(2).join("---");

	// Replace relative image links with absolute ones
	text.match(/(?:\.\/)?assets\/.*[.]png/g)?.forEach((path) => {
		text = text.replace(
			path,
			`https://raw.githubusercontent.com/MOD-Magazine/MOD-Magazine/main/issues/${issueNumber}/${path}`.replace("./", ""),
		);
	});

	return {
		content: text,
		frontmatter: parseYaml(frontmatter),
	};
}
