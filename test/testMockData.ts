import { PagesContents, PagesContent } from '../types/client/contentTypes';
import siteServerSideConfig from '../src/site.server-side-config';

export const mockDataPagesContents: PagesContents['contents'] = [
  {
    id: siteServerSideConfig.globalPageId,
    createdAt: '2020-12-27T04:04:30.107Z',
    updatedAt: '2020-12-27T04:04:30.107Z',
    publishedAt: '2020-12-27T04:04:30.107Z',
    revisedAt: '2020-12-27T04:04:30.107Z',
    title: 'My Starter MOCK',
    kind: ['page'],
    description: 'my starter home page',
    category: [],
    sections: [
      {
        fieldId: 'sectionFooter',
        title: 'language & library',
        content: [
          {
            fieldId: 'contentMarkdown',
            markdown:
              '- Next.js\n- Material-UI\n- Typescript\n- aspida\n- and more'
          }
        ]
      },
      {
        fieldId: 'sectionFooter',
        title: 'environment',
        content: [
          {
            fieldId: 'contentMarkdown',
            markdown: '- hot mock'
          }
        ]
      },
      {
        fieldId: 'sectionFooter',
        content: [
          {
            fieldId: 'contentMarkdown',
            markdown: '---\n\nMy Starter'
          }
        ]
      }
    ]
  },
  {
    id: 'home',
    createdAt: '2020-12-27T04:04:30.107Z',
    updatedAt: '2020-12-27T04:04:30.107Z',
    publishedAt: '2020-12-27T04:04:30.107Z',
    revisedAt: '2020-12-27T04:04:30.107Z',
    title: 'Home',
    kind: ['page'],
    description: 'my starter home page',
    category: [],
    sections: [
      {
        fieldId: 'sectionContent',
        title: 'intro',
        content: [
          {
            fieldId: 'contentHtml',
            html: '<p>index page</p>'
          },
          {
            fieldId: 'contentMarkdown',
            markdown: '## markdown\ndescribed by using markdown'
          },
          {
            fieldId: 'contentMarkdown',
            markdown: '## blog'
          },
          {
            fieldId: 'contentFragArticles',
            apiName: 'posts',
            category: []
          },
          {
            fieldId: 'contentFragArticles',
            apiName: 'posts',
            category: [{ id: 'cat2', title: 'category2' }],
            limit: 5
          }
        ]
      }
    ]
  },
  {
    id: 'blog',
    createdAt: '2020-12-26T15:29:14.476Z',
    updatedAt: '2020-12-26T15:29:14.476Z',
    publishedAt: '2020-12-26T15:29:14.476Z',
    revisedAt: '2020-12-26T15:29:14.476Z',
    title: 'Blog',
    kind: ['posts'],
    category: [
      { id: 'cat1', title: 'Category1' },
      { id: 'cat2', title: 'Category2' },
      { id: 'cat3', title: 'Category3' }
    ],
    sections: [
      {
        fieldId: 'sectionContent',
        title: 'all posts',
        content: [
          {
            fieldId: 'contentPageArticles',
            detail: true
          }
        ]
      }
    ]
  },
  {
    id: 'blog-posts',
    createdAt: '2020-12-26T15:29:14.476Z',
    updatedAt: '2020-12-26T15:29:14.476Z',
    publishedAt: '2020-12-26T15:29:14.476Z',
    revisedAt: '2020-12-26T15:29:14.476Z',
    title: 'Blog',
    kind: ['posts'],
    category: [
      { id: 'cat1', title: 'Category1' },
      { id: 'cat2', title: 'Category2' },
      { id: 'cat3', title: 'Category3' }
    ],
    sections: [
      {
        fieldId: 'sectionTop',
        content: [
          {
            fieldId: 'contentMarkdown',
            markdown: 'post top\n\n---'
          }
        ]
      },
      {
        fieldId: 'sectionBottom',
        content: [
          {
            fieldId: 'contentMarkdown',
            markdown: '---\n\npost bottom'
          }
        ]
      }
    ]
  },
  {
    id: 'blog-category',
    createdAt: '2020-12-26T15:29:14.476Z',
    updatedAt: '2020-12-26T15:29:14.476Z',
    publishedAt: '2020-12-26T15:29:14.476Z',
    revisedAt: '2020-12-26T15:29:14.476Z',
    title: 'Blog Category',
    kind: ['posts'],
    category: [
      { id: 'cat1', title: 'Category1' },
      { id: 'cat2', title: 'Category2' },
      { id: 'cat3', title: 'Category3' }
    ],
    sections: [
      {
        fieldId: 'sectionTop',
        content: [
          {
            fieldId: 'contentMarkdown',
            markdown: 'category top\n\n---'
          }
        ]
      },
      {
        fieldId: 'sectionContent',
        title: 'all posts',
        content: [
          {
            fieldId: 'contentPageArticles'
          }
        ]
      },
      {
        fieldId: 'sectionBottom',
        content: [
          {
            fieldId: 'contentMarkdown',
            markdown: '---\n\ncategory bottom'
          }
        ]
      }
    ]
  }
];
export const mockDataPages: PagesContents = {
  contents: mockDataPagesContents,
  totalCount: mockDataPagesContents.length,
  offset: 0,
  limit: 120000
};

export const mockDataPagesOuterHome = {
  ...mockDataPages,
  contents: [mockDataPages.contents[0], mockDataPages.contents[1]]
};

export const mockDataPagesOuterBlog = {
  ...mockDataPages,
  contents: [mockDataPages.contents[0], mockDataPages.contents[2]]
};

export const mockDataPagesOuter = {
  ...mockDataPages,
  contents: [mockDataPages.contents[0]]
};

export const mockDataPagesOuterPosts = {
  ...mockDataPages,
  contents: [mockDataPages.contents[0], mockDataPages.contents[3]]
};

export const mockDataPagesOuterCategory = {
  ...mockDataPages,
  contents: [mockDataPages.contents[0], mockDataPages.contents[4]]
};

export const mockDataPagesList = {
  ...mockDataPages,
  contents: mockDataPages.contents.map((v) => ({
    ...v,
    kind: undefined,
    description: undefined,
    sections: undefined
  }))
};

export const mockDataPagesIds = {
  ...mockDataPages,
  contents: mockDataPages.contents.map(({ id }) => ({ id }))
};

export const mockDataArticlesContents: PagesContents['contents'] = [
  {
    id: 'mmmmmmmmm',
    createdAt: '2021-01-13T05:12.157Z',
    updatedAt: '2021-01-13T05:12.157Z',
    publishedAt: '2021-01-13T05:12.157Z',
    revisedAt: '2021-01-13T05:12.157Z',
    title: 'title4',
    kind: ['page'],
    category: [{ id: 'cat3', title: 'category3' }],
    sections: [
      {
        fieldId: 'sectionContent',
        content: [
          {
            fieldId: 'contentMarkdown',
            markdown: 'markdown content'
          }
        ]
      }
    ]
  },
  {
    id: 'zzzzzzzzz',
    createdAt: '2020-12-27T04:04:30.107Z',
    updatedAt: '2020-12-27T04:04:30.107Z',
    publishedAt: '2020-12-27T04:04:30.107Z',
    revisedAt: '2020-12-27T04:04:30.107Z',
    title: 'title3',
    kind: ['page'],
    category: [],
    sections: [
      {
        fieldId: 'sectionContent',
        content: [
          {
            fieldId: 'contentHtml',
            html: '<p>content3</p>'
          }
        ]
      }
    ]
  },
  {
    id: 'yyyyyy-da',
    createdAt: '2020-12-26T15:29:14.476Z',
    updatedAt: '2020-12-26T15:29:14.476Z',
    publishedAt: '2020-12-26T15:29:14.476Z',
    revisedAt: '2020-12-26T15:29:14.476Z',
    title: 'title2',
    kind: ['page'],
    category: [
      { id: 'cat1', title: 'category1' },
      { id: 'cat2', title: 'category2' }
    ],
    sections: [
      {
        fieldId: 'sectionContent',
        content: [
          {
            fieldId: 'contentHtml',
            html: '<p>content2</p>'
          }
        ]
      }
    ]
  },
  {
    id: 'xxxxxxxxx',
    createdAt: '2020-12-26T12:25:43.532Z',
    updatedAt: '2020-12-26T12:27:22.533Z',
    publishedAt: '2020-12-26T12:27:22.533Z',
    revisedAt: '2020-12-26T12:27:22.533Z',
    title: 'title1',
    kind: ['page'],
    category: [{ id: 'cat2', title: 'category2' }],
    sections: [
      {
        fieldId: 'sectionContent',
        content: [
          {
            fieldId: 'contentHtml',
            html: '<p>content1</p>'
          }
        ]
      }
    ]
  }
];
export const mockDataArticles: PagesContents = {
  contents: mockDataArticlesContents,
  totalCount: mockDataArticlesContents.length,
  offset: 0,
  limit: 120000
};

export const mockDataArticleLContent = mockDataArticles.contents[0];

const mockDataArticleListContens = mockDataArticles.contents.map((v) => ({
  ...v,
  kind: undefined,
  description: undefined,
  sections: undefined
}));
export const mockDataArticleList = {
  ...mockDataArticles,
  contents: mockDataArticleListContens
};

export const mockDataArticleIds = {
  ...mockDataArticles,
  contents: mockDataArticles.contents.map(({ id }) => ({ id }))
};

export const mockDataArticleCat1Contents = mockDataArticleList.contents.filter(
  ({ category }) => category.some(({ id }) => id === 'cat1')
);
export const mockDataArticleCat1 = {
  ...mockDataArticles,
  contents: mockDataArticleCat1Contents,
  totalCount: mockDataArticleCat1Contents.length
};

export const mockDataArticleCat2Contents = mockDataArticleList.contents.filter(
  ({ category }) => category.some(({ id }) => id === 'cat2')
);
export const mockDataArticleCat2 = {
  ...mockDataArticles,
  contents: mockDataArticleCat2Contents,
  totalCount: mockDataArticleCat2Contents.length
};

export const mockDataArticleCat3Contents = mockDataArticleList.contents.filter(
  ({ category }) => category.some(({ id }) => id === 'cat3')
);
export const mockDataArticleCat3 = {
  ...mockDataArticles,
  contents: mockDataArticleCat3Contents,
  totalCount: mockDataArticleCat3Contents.length
};

export const mockDataArticleCat1Ids = {
  ...mockDataArticleCat1,
  contents: mockDataArticleCat1.contents.map(({ id }) => ({ id }))
};

export const mockDataArticleCat2Ids = {
  ...mockDataArticleCat2,
  contents: mockDataArticleCat2.contents.map(({ id }) => ({ id }))
};

export const mockDataArticleCat3Ids = {
  ...mockDataArticleCat3,
  contents: mockDataArticleCat3.contents.map(({ id }) => ({ id }))
};

export const mockDataCategoryContents: PagesContents['contents'] = [
  {
    id: 'cat1',
    createdAt: '2021-01-23T20:32.477Z',
    updatedAt: '2021-01-23T20:32.477Z',
    publishedAt: '2021-01-23T20:32.477Z',
    revisedAt: '2021-01-23T20:32.477Z',
    title: 'category1',
    kind: ['page'],
    category: [],
    sections: []
  },
  {
    id: 'cat2',
    createdAt: '2021-01-23T20:32.477Z',
    updatedAt: '2021-01-23T20:32.477Z',
    publishedAt: '2021-01-23T20:32.477Z',
    revisedAt: '2021-01-23T20:32.477Z',
    title: 'category2',
    kind: ['page'],
    category: [],
    sections: []
  },
  {
    id: 'cat3',
    createdAt: '2021-01-23T20:32.477Z',
    updatedAt: '2021-01-23T20:32.477Z',
    publishedAt: '2021-01-23T20:32.477Z',
    revisedAt: '2021-01-23T20:32.477Z',
    title: 'category3',
    kind: ['page'],
    category: [],
    sections: []
  }
];
export const mockDataCategory: PagesContents = {
  contents: mockDataCategoryContents,
  totalCount: mockDataCategoryContents.length,
  offset: 0,
  limit: 10
};

export const mockDataCategoryList = {
  ...mockDataCategory,
  contents: mockDataCategory.contents.map((v) => ({
    ...v,
    kind: undefined,
    description: undefined,
    sections: undefined
  }))
};

export const mockDataCategoryIds = {
  ...mockDataCategory,
  contents: mockDataCategory.contents.map(({ id }) => ({ id }))
};

function makeDummyContent(n: number, cat: string): PagesContent[] {
  const ret = [];
  for (let i = 0; i < n; i++) {
    ret.push({
      id: `pa${cat}${i}`,
      createdAt: '2021-01-23T20:32.477Z',
      updatedAt: '2021-01-23T20:32.477Z',
      publishedAt: '2021-01-23T20:32.477Z',
      revisedAt: '2021-01-23T20:32.477Z',
      title: `pa${cat}${i}`,
      kind: ['page'] as ['page'],
      category: [{ id: cat, title: `category-${cat}` }],
      sections: []
    });
  }
  return ret;
}

const mockDataPaginationContents = makeDummyContent(30, 'cat1').concat(
  makeDummyContent(55, 'cat2'),
  makeDummyContent(21, 'cat3')
);
export const mockDataPagination: PagesContents = {
  // contents: makeDummyContent(30, 'cat1'),
  contents: mockDataPaginationContents,
  totalCount: mockDataPaginationContents.length,
  offset: 0,
  limit: 10
};

export const mockDataPaginationList = {
  ...mockDataPagination,
  contents: mockDataPagination.contents.map((v) => ({
    ...v,
    kind: undefined,
    description: undefined,
    sections: undefined
  }))
};

export const mockDataPaginationIds = {
  ...mockDataPagination,
  contents: mockDataPagination.contents.map(({ id }) => ({ id }))
};

const mockDataPaginationCat1Contents = mockDataPaginationList.contents.filter(
  ({ category }) => category.some(({ id }) => id === 'cat1')
);
export const mockDataPaginationCat1 = {
  ...mockDataPagination,
  contents: mockDataPaginationCat1Contents,
  totalCount: mockDataPaginationCat1Contents.length
};

const mockDataPaginationCat2Contents = mockDataPaginationList.contents.filter(
  ({ category }) => category.some(({ id }) => id === 'cat2')
);
export const mockDataPaginationCat2 = {
  ...mockDataPagination,
  contents: mockDataPaginationCat2Contents,
  totalCount: mockDataPaginationCat2Contents.length
};

const mockDataPaginationCat3Contents = mockDataPaginationList.contents.filter(
  ({ category }) => category.some(({ id }) => id === 'cat3')
);
export const mockDataPaginationCat3 = {
  ...mockDataPagination,
  contents: mockDataPaginationCat3Contents,
  totalCount: mockDataPaginationCat3Contents.length
};

export const mockDataPaginationCat1Ids = {
  ...mockDataPaginationCat1,
  contents: mockDataPaginationCat1.contents.map(({ id }) => ({ id }))
};

export const mockDataPaginationCat2Ids = {
  ...mockDataPaginationCat2,
  contents: mockDataPaginationCat2.contents.map(({ id }) => ({ id }))
};

export const mockDataPaginationCat3Ids = {
  ...mockDataPaginationCat3,
  contents: mockDataPaginationCat3.contents.map(({ id }) => ({ id }))
};
