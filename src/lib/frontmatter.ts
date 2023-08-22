import { parse as parseYaml } from "yaml";

export function parseFrontmatter<T>(content: string): { frontmatter: T; content: string } {
	const frontmatter = content.split("---")[1];
	const text = content.split("---")[2];

	return {
		content: text,
		frontmatter: parseYaml(frontmatter),
	};
}
