import siteServerSideConfig from '../../src/site.server-side-config';
import { PagesContents, PagesContent } from './contentTypes';

const mockDataPagesContents: PagesContents['contents'] = [
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
            category: [],
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

function makeDummyContent(
  n: number,
  prefix: string,
  cat: string,
  image: boolean = false
): PagesContent[] {
  const ret = [];
  for (let i = n; i > 0; i--) {
    const sections: PagesContent['sections'] = [
      {
        fieldId: 'sectionContent' as 'sectionContent',
        content: [
          {
            fieldId: 'contentMarkdown' as 'contentMarkdown',
            markdown: `mock dummy ${prefix}-${i}`
          }
        ]
      }
    ];
    if (image) {
      sections[0].content.push({
        fieldId: 'contentImage' as 'contentImage',
        image: {
          url:
            'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/hankei6km-pages/media/my-starter-default-main-image.png',
          width: 1000,
          height: 600
        },
        alt: 'dummy'
      });
    }
    ret.push({
      id: `${cat}-${prefix}-${i}`,
      createdAt: '2021-01-23T20:32.477Z',
      updatedAt: '2021-01-23T20:32.477Z',
      publishedAt: '2021-01-23T20:32.477Z',
      revisedAt: '2021-01-23T20:32.477Z',
      title: `mock ${prefix}-${i}`,
      kind: ['page'] as ['page'],
      category: [{ id: cat, title: `category-${cat}` }],
      sections: sections
    });
  }
  return ret;
}

const useMockDummy = true;

const mockDataArticlesContents: PagesContents['contents'] = useMockDummy
  ? makeDummyContent(5, 'dummy1-1', 'cat1', true).concat(
      makeDummyContent(5, 'dummy2-1', 'cat2'),
      makeDummyContent(5, 'dummy1-2', 'cat1'),
      makeDummyContent(29, 'dummy3-1', 'cat3'),
      makeDummyContent(21, 'dummy1-3', 'cat1'),
      makeDummyContent(40, 'dummy3-1', 'cat3')
    )
  : [
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
  limit: 10
};

export const mockDataArticleList = {
  ...mockDataArticles,
  contents: mockDataArticles.contents.map((v) => ({
    ...v,
    kind: undefined,
    description: undefined,
    sections: undefined
  }))
};

export const mockDataArticleIds = {
  ...mockDataArticles,
  contents: mockDataArticles.contents.map(({ id }) => ({ id }))
};

const mockDataCategoryContents: PagesContents['contents'] = [
  {
    id: 'cat1',
    createdAt: '2021-01-23T20:32.477Z',
    updatedAt: '2021-01-23T20:32.477Z',
    publishedAt: '2021-01-23T20:32.477Z',
    revisedAt: '2021-01-23T20:32.477Z',
    title: 'category-cat1',
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
    title: 'category-cat2',
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
    title: 'category-cat3',
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
