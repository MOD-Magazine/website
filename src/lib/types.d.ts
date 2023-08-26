export type ArticleFrontmatter = {
	title: string;
	summary: string;
	author: string;
	image: string | null;
	coauthors: string[] | null;
};

export type IssueArticle = {
	raw_url: string;
	path: string;
	date: string;
	title: string;
	summary: string;
	image: string | null;
	author: string;
	coauthors: string[] | null;
};

export type Issue = {
	date: string;
	articles: IssueArticle[];
};
