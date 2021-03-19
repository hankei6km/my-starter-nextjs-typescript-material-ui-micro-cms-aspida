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

export type PagesCategory = {
  id: string;
  title: string;
};
type PagesContentHtml = {
  fieldId: 'contentHtml';
  html: string;
};
type PagesContentMarkdown = {
  fieldId: 'contentMarkdown';
  markdown: string;
};
type PagesContentPageArticles = {
  // ページの主題の一覧.
  // 項目がページに対応する一覧ではない.
  // たとえば、ブログのページなら記事の一覧となる.
  // 記事の一覧を取得する API は
  // route(getStaticPaths など)で固定的に指定されている.
  // pagination 処理も行われる.
  fieldId: 'contentPageArticles';
  detail?: boolean;
};
type PagesContentFragArticles = {
  // ページに埋め込む一覧.
  // API 等はコンテンツ側で指定ができる。
  // pagination 等は行われない
  fieldId: 'contentFragArticles';
  apiName: string;
  detail?: boolean;
  category: PagesCategory[];
  limit?: number;
};
type PagesContentImage = {
  fieldId: 'contentImage';
  image: {
    url: string;
    width: number;
    height: number;
  };
  alt: string;
  link?: string;
  newTab?: boolean;
  asThumb?: boolean;
};
type PagesContentNotification = {
  fieldId: 'contentNotification';
  title?: string;
  messageHtml: string;
  severity: ['info' | 'warning' | 'alert']; // 複数選択ではない
  enabled?: boolean;
  autoHide?: boolean;
  notificationId?: string;
};

type PageContent =
  | PagesContentHtml
  | PagesContentMarkdown
  | PagesContentPageArticles
  | PagesContentFragArticles
  | PagesContentImage
  | PagesContentNotification;
type PagesSectionBase = {
  title?: string;
  content: PageContent[]; // array にしているが、API スキーマ等にあわせたもので、１つコンテントという認識(articlesはちょっと違うか)
  persist?: boolean; // SectionContent では効力は発生しない
};
type PagesSectionContent = {
  fieldId: 'sectionContent';
} & PagesSectionBase;
type PagesSectionTop = {
  fieldId: 'sectionTop';
} & PagesSectionBase;
type PagesSectionBottom = {
  fieldId: 'sectionBottom';
} & PagesSectionBase;
type PagesSectionHeader = {
  fieldId: 'sectionHeader';
} & PagesSectionBase;
type PagesSectionFooter = {
  fieldId: 'sectionFooter';
} & PagesSectionBase;
type PagesSection =
  | PagesSectionContent
  | PagesSectionTop
  | PagesSectionBottom
  | PagesSectionHeader
  | PagesSectionFooter;
export type PagesSectionKind = PagesSection['fieldId'];
type Pages = {
  title: string;
  kind: ['posts' | 'gallery' | 'page']; // 複数選択にしていない
  description?: string;
  mainImage?: string;
  category: Pick<PagesContent, 'id' | 'title'>[]; // 必須ではないが undefined にはならいもよう(配列だから?)
  sections: PagesSection[];
};
export type PagesContent = ContentBase & Pages;
export type PagesIndex = Omit<
  PagesContent,
  'kind' | 'description' | 'sections'
>;
export type PagesId = Pick<PagesContent, 'id'>;
export type PagesContents = ContentList<PagesContent>;
export type PagesIdsContents = Omit<PagesContents, 'offset' | 'limit'>;
export type PagesList = ContentList<PagesIndex>;
export type PagesIds = ContentList<PagesId>;

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

export const blankPagesList = (): PagesList => ({
  contents: [],
  totalCount: 0,
  limit: 0,
  offset: 0
});

export const blankPageContent = (): PagesContent => ({
  ...contentBase,
  title: '',
  kind: ['page'],
  description: '',
  category: [],
  sections: []
});
