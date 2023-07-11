export type ArticleFrontmatter = {
	title: string;
	summary: string;
	author: string;
	coauthors: string[] | null;
};

export type IssueArticle = {
	raw_url: string;
	path: string;
	title: string;
	summary: string;
	author: string;
	coauthors: string[] | null;
};

export type Issue = {
	date: string;
	articles: IssueArticle[];
};
