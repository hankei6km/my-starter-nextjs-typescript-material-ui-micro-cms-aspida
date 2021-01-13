type ContentBase = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt?: string; // 古いcontentにはついていないのでオプショナル.
};

type ContentList<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

type PagesContentHtml = {
  fieldId: 'contentHtml';
  html: string;
};
type PagesContentMarkdown = {
  fieldId: 'contentMarkdown';
  markdown: string;
};
type PagesContentArticles = {
  fieldId: 'contentArticles';
  apiName: string;
  detail?: boolean;
};
type PagesSection = {
  fieldId: 'sectionContent';
  title?: string;
  content: (PagesContentHtml | PagesContentMarkdown | PagesContentArticles)[]; // array にしているが、API スキーマ等にあわせたもので、１つコンテントという認識(articlesはちょっと違うか)
};

type Pages = {
  title: string;
  kind: ['posts' | 'gallery' | 'page']; // 複数選択にしていない
  description?: string;
  sections: PagesSection[];
};
export type PagesContent = ContentBase & Pages;
export type PagesIndex = Omit<
  PagesContent,
  'kind' | 'descriptionHtml' | 'descriptionMarkdown' | 'sections'
>;
export type PagesId = Pick<PagesContent, 'id'>;
export type PagesContents = ContentList<PagesContent>;
export type PagesList = ContentList<PagesIndex>;
export type PagesIds = ContentList<PagesId>;

type ArticleContentHtml = {
  fieldId: 'contentHtml';
  html: string;
};
type ArticleContenMarkdown = {
  fieldId: 'contentMarkdown';
  markdown: string;
};

type Article = {
  title: string;
  content: (ArticleContentHtml | ArticleContenMarkdown)[];
  mainImage?: string;
};
export type ArticleContent = ContentBase & Article;
export type ArticleIndex = Omit<ArticleContent, 'content'>;
export type ArticleId = Pick<ArticleContent, 'id'>;
export type ArticleContents = ContentList<ArticleContent>;
export type ArticleList = ContentList<ArticleIndex>;
export type ArticleIds = ContentList<ArticleId>;

const contentBase: ContentBase = {
  id: '',
  createdAt: '',
  updatedAt: '',
  publishedAt: '',
  revisedAt: ''
};
// const pagesSection: PagesSection = {
//   title: '',
//   kind: 'content',
//   contentHtml: ''
// };

export const blankPageContent = (): PagesContent => ({
  ...contentBase,
  title: '',
  kind: ['page'],
  description: '',
  sections: []
});

export const blankArticleContent = (): ArticleContent => ({
  ...contentBase,
  title: '',
  content: []
});
