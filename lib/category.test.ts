import {
  mockDataCategory,
  mockDataPagesOuterCategory,
  mockDataArticleCat2
} from '../test/testMockData';
import { FetchMock } from 'jest-fetch-mock';
import siteServerSideConfig from '../src/site.server-side-config';
import { getPagesPageData } from './pages';
import { queryParams } from '../test/testUtils';

// https://github.com/jefflau/jest-fetch-mock/issues/83
const fetchMock = fetch as FetchMock;
beforeEach(() => {
  fetchMock.resetMocks();
});

const testApiName = 'category';

// カテゴリについては現状では一覧を取得はしないので(全体で１つの category API を使う場合は、
// pages の page 内で設定した allCategry が一覧で使われる)、
// よって、その辺のテストは省略.:

describe('getSortedPagesData()', () => {
  it('should returns category data of "cat2" with outer', async () => {
    fetchMock
      .mockResponseOnce(JSON.stringify(mockDataPagesOuterCategory))
      .mockResponseOnce(
        JSON.stringify(
          mockDataCategory.contents.find(({ id }) => id === 'cat2')
        )
      )
      .mockResponseOnce(JSON.stringify(mockDataArticleCat2));
    const res = await getPagesPageData(
      testApiName,
      { params: { id: 'cat2' } },
      {
        outerIds: ['blog-category'],
        articlesApi: 'posts',
        curCategory: 'cat2'
      }
    );
    expect(fetchMock).toHaveBeenCalledTimes(3);
    // pages から global 等の取得.
    expect(fetchMock.mock.calls[0][0]).toContain('/pages?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      ids: `${siteServerSideConfig.globalPageId},blog-category`,
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,kind,description,mainImage,category.id,category.title,sections'
    });
    // categoyから項目取得.
    expect(fetchMock.mock.calls[1][0]).toContain('/category/cat2?');
    expect(queryParams(String(fetchMock.mock.calls[1][0]))).toStrictEqual({
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,kind,description,mainImage,category.id,category.title,sections'
    });
    // posts からカテゴリ指定で artcles の取得.
    expect(fetchMock.mock.calls[2][0]).toContain('/posts?');
    expect(queryParams(String(fetchMock.mock.calls[2][0]))).toStrictEqual({
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,category.id,category.title',
      filters: 'category[contains]cat2'
    });
    expect(res).toEqual({
      id: 'cat2',
      updated: '2021-01-23T20:32.477Z',
      pageNo: 1,
      pageCount: -1,
      title: 'category2',
      description: 'my starter home page',
      mainImage: '',
      allCategory: [
        { id: 'cat1', title: 'Category1' },
        { id: 'cat2', title: 'Category2' },
        { id: 'cat3', title: 'Category3' }
      ],
      category: [],
      curCategory: 'cat2',
      contentToc: {
        label: 'toc',
        items: [
          {
            label: 'all posts',
            depth: 0,
            items: [],
            id: 'all-posts'
          }
        ]
      },
      header: [],
      top: [
        {
          title: '',
          id: '',
          persist: false,
          content: [
            {
              kind: 'html',
              contentHtml: [
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'category top'
                },
                {
                  tagName: 'hr',
                  style: {},
                  attribs: {},
                  html: ''
                }
              ]
            }
          ]
        }
      ],
      sections: [
        {
          title: 'all posts',
          id: 'all-posts',
          persist: false,
          content: [
            {
              kind: 'posts',
              postsKind: 'page',
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
      bottom: [
        {
          title: '',
          id: '',
          persist: false,
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
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'category bottom'
                }
              ]
            }
          ]
        }
      ],
      footer: [
        {
          title: 'language & library',
          id: 'language---library',
          persist: false,
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
          persist: false,
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
          persist: false,
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
    });
  });
});
