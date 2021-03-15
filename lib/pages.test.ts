import siteServerSideConfig from '../src/site.server-side-config';
import {
  mockDataPages,
  mockDataPagesOuterHome,
  mockDataPagesList,
  mockDataPagesIds,
  mockDataArticleList,
  mockDataPagesOuterBlog,
  mockDataArticleCat2
} from '../test/testMockData';
import { FetchMock } from 'jest-fetch-mock';
import {
  getSortedPagesData,
  getAllPagesIds,
  getPagesData,
  getPagesPageData
} from './pages';
import { queryParams } from '../test/testUtils';

// https://github.com/jefflau/jest-fetch-mock/issues/83
const fetchMock = fetch as FetchMock;
beforeEach(() => {
  fetchMock.resetMocks();
});

describe('getSortedPagesData()', () => {
  it('should returns contents array with out contet filed', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockDataPagesList));
    const res = await getSortedPagesData('pages');
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toContain('/pages?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,category.id,category.title'
    });
    expect(res).toStrictEqual({
      contents: [
        {
          id: siteServerSideConfig.globalPageId,
          createdAt: '2020-12-27T04:04:30.107Z',
          updatedAt: '2020-12-27T04:04:30.107Z',
          publishedAt: '2020-12-27T04:04:30.107Z',
          revisedAt: '2020-12-27T04:04:30.107Z',
          title: 'My Starter MOCK',
          category: []
        },
        {
          id: 'home',
          createdAt: '2020-12-27T04:04:30.107Z',
          updatedAt: '2020-12-27T04:04:30.107Z',
          publishedAt: '2020-12-27T04:04:30.107Z',
          revisedAt: '2020-12-27T04:04:30.107Z',
          title: 'Home',
          category: []
        },
        {
          id: 'blog',
          createdAt: '2020-12-26T15:29:14.476Z',
          updatedAt: '2020-12-26T15:29:14.476Z',
          publishedAt: '2020-12-26T15:29:14.476Z',
          revisedAt: '2020-12-26T15:29:14.476Z',
          title: 'Blog',
          category: [
            { id: 'cat1', title: 'Category1' },
            { id: 'cat2', title: 'Category2' },
            { id: 'cat3', title: 'Category3' }
          ]
        },
        {
          id: 'blog-posts',
          createdAt: '2020-12-26T15:29:14.476Z',
          updatedAt: '2020-12-26T15:29:14.476Z',
          publishedAt: '2020-12-26T15:29:14.476Z',
          revisedAt: '2020-12-26T15:29:14.476Z',
          title: 'Blog',
          category: [
            { id: 'cat1', title: 'Category1' },
            { id: 'cat2', title: 'Category2' },
            { id: 'cat3', title: 'Category3' }
          ]
        },
        {
          id: 'blog-category',
          createdAt: '2020-12-26T15:29:14.476Z',
          updatedAt: '2020-12-26T15:29:14.476Z',
          publishedAt: '2020-12-26T15:29:14.476Z',
          revisedAt: '2020-12-26T15:29:14.476Z',
          title: 'Blog Category',
          category: [
            { id: 'cat1', title: 'Category1' },
            { id: 'cat2', title: 'Category2' },
            { id: 'cat3', title: 'Category3' }
          ]
        }
      ],
      totalCount: 5,
      offset: 0,
      limit: 120000
    });
    // expect(fetchMock.mock.calls[0][1]?.headers) 環境変数の設定とメッセージによっては API キーが漏洩する可能性があるのでとりあえずやめる
  });
});

describe('getAllPagesIds()', () => {
  it('should returns all ids', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockDataPagesIds));
    expect(await getAllPagesIds('pages')).toStrictEqual([
      siteServerSideConfig.globalPageId,
      'home',
      'blog',
      'blog-posts',
      'blog-category'
    ]);
    expect(fetchMock.mock.calls[0][0]).toContain('/pages?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      fields: 'id',
      limit: '120000'
    });
  });
});

describe('getPagesData()', () => {
  it('should returns content data of "home"', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify(mockDataPages.contents.find(({ id }) => id === 'home'))
    );
    expect(
      await getPagesData('pages', { params: { id: 'home' } })
    ).toStrictEqual({
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
    });
    expect(fetchMock.mock.calls[0][0]).toContain('/pages/home?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,kind,description,mainImage,category.id,category.title,sections'
    });
  });
});
describe('getPagesPageData()', () => {
  it('should returns PageData', async () => {
    fetchMock
      .mockResponseOnce(JSON.stringify(mockDataPagesOuterHome))
      .mockResponseOnce(JSON.stringify(mockDataArticleList))
      .mockResponseOnce(JSON.stringify(mockDataArticleCat2));
    expect(await getPagesPageData('pages', { params: { id: 'home' } })).toEqual(
      {
        id: 'home',
        updated: '2020-12-27T04:04:30.107Z',
        pageNo: 1,
        pageCount: -1,
        title: 'Home',
        description: 'my starter home page',
        mainImage: '',
        allCategory: [],
        category: [],
        curCategory: '',
        contentToc: {
          label: 'toc',
          items: [
            {
              depth: 0,
              id: 'intro',
              items: [
                {
                  depth: 1,
                  id: 'user-content-markdown',
                  items: [],
                  label: 'markdown'
                },
                {
                  depth: 1,
                  id: 'user-content-blog',
                  items: [],
                  label: 'blog'
                }
              ],
              label: 'intro'
            }
          ]
        },
        header: [],
        top: [],
        sections: [
          {
            title: 'intro',
            id: 'intro',
            content: [
              {
                kind: 'html',
                contentHtml: [
                  {
                    tagName: 'p',
                    style: {},
                    attribs: {},
                    html: 'index page'
                  }
                ]
              },
              {
                kind: 'html',
                contentHtml: [
                  {
                    tagName: 'h4',
                    style: {},
                    attribs: { id: 'user-content-markdown' },
                    html: 'markdown'
                  },
                  {
                    tagName: 'p',
                    style: {},
                    attribs: {},
                    html: 'described by using markdown'
                  }
                ]
              },
              {
                kind: 'html',
                contentHtml: [
                  {
                    tagName: 'h4',
                    style: {},
                    attribs: { id: 'user-content-blog' },
                    html: 'blog'
                  }
                ]
              },
              {
                kind: 'posts',
                postsKind: 'fragment',
                contents: [
                  {
                    id: 'mmmmmmmmm',
                    createdAt: '2021-01-13T05:12.157Z',
                    updatedAt: '2021-01-13T05:12.157Z',
                    publishedAt: '2021-01-13T05:12.157Z',
                    revisedAt: '2021-01-13T05:12.157Z',
                    title: 'title4',
                    category: [{ id: 'cat3', title: 'category3' }],
                    path: '/posts'
                  },
                  {
                    id: 'zzzzzzzzz',
                    createdAt: '2020-12-27T04:04:30.107Z',
                    updatedAt: '2020-12-27T04:04:30.107Z',
                    publishedAt: '2020-12-27T04:04:30.107Z',
                    revisedAt: '2020-12-27T04:04:30.107Z',
                    title: 'title3',
                    category: [],
                    path: '/posts'
                  },
                  {
                    id: 'yyyyyy-da',
                    createdAt: '2020-12-26T15:29:14.476Z',
                    updatedAt: '2020-12-26T15:29:14.476Z',
                    publishedAt: '2020-12-26T15:29:14.476Z',
                    revisedAt: '2020-12-26T15:29:14.476Z',
                    title: 'title2',
                    category: [
                      { id: 'cat1', title: 'category1' },
                      { id: 'cat2', title: 'category2' }
                    ],
                    path: '/posts'
                  },
                  {
                    id: 'xxxxxxxxx',
                    createdAt: '2020-12-26T12:25:43.532Z',
                    updatedAt: '2020-12-26T12:27:22.533Z',
                    publishedAt: '2020-12-26T12:27:22.533Z',
                    revisedAt: '2020-12-26T12:27:22.533Z',
                    title: 'title1',
                    category: [{ id: 'cat2', title: 'category2' }],
                    path: '/posts'
                  }
                ],
                totalCount: 4,
                detail: false
              },
              {
                kind: 'posts',
                postsKind: 'fragment',
                contents: [
                  {
                    id: 'yyyyyy-da',
                    createdAt: '2020-12-26T15:29:14.476Z',
                    updatedAt: '2020-12-26T15:29:14.476Z',
                    publishedAt: '2020-12-26T15:29:14.476Z',
                    revisedAt: '2020-12-26T15:29:14.476Z',
                    title: 'title2',
                    category: [
                      { id: 'cat1', title: 'category1' },
                      { id: 'cat2', title: 'category2' }
                    ],
                    path: '/posts'
                  },
                  {
                    id: 'xxxxxxxxx',
                    createdAt: '2020-12-26T12:25:43.532Z',
                    updatedAt: '2020-12-26T12:27:22.533Z',
                    publishedAt: '2020-12-26T12:27:22.533Z',
                    revisedAt: '2020-12-26T12:27:22.533Z',
                    title: 'title1',
                    category: [{ id: 'cat2', title: 'category2' }],
                    path: '/posts'
                  }
                ],
                totalCount: 2,
                detail: false
              }
            ]
          }
        ],
        bottom: [],
        footer: [
          {
            title: 'language & library',
            id: 'language---library',
            content: [
              {
                kind: 'html',
                contentHtml: [
                  {
                    tagName: 'ul',
                    style: {},
                    attribs: {},
                    html:
                      '<li>Next.js</li><li>Material-UI</li><li>Typescript</li><li>aspida</li><li>and more</li>'
                  }
                ]
              }
            ]
          },
          {
            title: 'environment',
            id: 'environment',
            content: [
              {
                kind: 'html',
                contentHtml: [
                  {
                    tagName: 'ul',
                    style: {},
                    attribs: {},
                    html: '<li>hot mock</li>'
                  }
                ]
              }
            ]
          },
          {
            title: '',
            id: '',
            content: [
              {
                kind: 'html',
                contentHtml: [
                  {
                    tagName: 'hr',
                    style: {},
                    attribs: {},
                    html: ''
                  },
                  { tagName: 'p', style: {}, attribs: {}, html: 'My Starter' }
                ]
              }
            ]
          }
        ]
      }
    );
    expect(fetchMock).toHaveBeenCalledTimes(3);
    // pages から global と home の取得.
    expect(fetchMock.mock.calls[0][0]).toContain('/pages?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      ids: `${siteServerSideConfig.globalPageId},home`,
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,kind,description,mainImage,category.id,category.title,sections'
    });
    // posts から artcles の取得.
    expect(fetchMock.mock.calls[1][0]).toContain('/posts?');
    expect(queryParams(String(fetchMock.mock.calls[1][0]))).toStrictEqual({
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,category.id,category.title'
    });
  });
  it('should get articles data via contentPageArticles', async () => {
    fetchMock
      .mockResponseOnce(JSON.stringify(mockDataPagesOuterBlog))
      .mockResponseOnce(JSON.stringify(mockDataArticleList));
    await getPagesPageData(
      'pages',
      { params: { id: 'blog' } },
      { outerIds: [], articlesApi: 'posts', pageNo: 3, itemsPerPage: 10 }
    );
    // offset と  limit の指定のみ確認
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[1][0]).toContain('/posts?');
    expect(queryParams(String(fetchMock.mock.calls[1][0]))).toStrictEqual({
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,category.id,category.title',
      limit: '10',
      offset: '20'
    });
  });
  it('should get articles data via contentPageArticles with category', async () => {
    fetchMock
      .mockResponseOnce(JSON.stringify(mockDataPagesOuterBlog))
      .mockResponseOnce(JSON.stringify(mockDataArticleList));
    await getPagesPageData(
      'pages',
      { params: { id: 'blog' } },
      {
        outerIds: [],
        articlesApi: 'posts',
        curCategory: 'cat1',
        pageNo: 3,
        itemsPerPage: 10
      }
    );
    // filters (category 指定あり) も確認
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[1][0]).toContain('/posts?');
    expect(queryParams(String(fetchMock.mock.calls[1][0]))).toStrictEqual({
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,category.id,category.title',
      filters: 'category[contains]cat1',
      limit: '10',
      offset: '20'
    });
  });
  it('should get articles data via contentFragArticles', async () => {
    fetchMock
      .mockResponseOnce(JSON.stringify(mockDataPagesOuterHome))
      .mockResponseOnce(JSON.stringify(mockDataArticleList))
      .mockResponseOnce(JSON.stringify(mockDataArticleCat2));
    await getPagesPageData(
      'pages',
      { params: { id: 'blog' } },
      { outerIds: [], articlesApi: 'posts', pageNo: 3, itemsPerPage: 10 }
    );
    // offset と  limit の指定がない(fragArticles では指定されない)ことを確認
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(fetchMock.mock.calls[1][0]).toContain('/posts?');
    expect(queryParams(String(fetchMock.mock.calls[1][0]))).toStrictEqual({
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,category.id,category.title'
    });
    expect(fetchMock.mock.calls[2][0]).toContain('/posts?');
    expect(queryParams(String(fetchMock.mock.calls[2][0]))).toStrictEqual({
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,category.id,category.title',
      filters: 'category[contains]cat2',
      limit: '5'
    });
  });
});
