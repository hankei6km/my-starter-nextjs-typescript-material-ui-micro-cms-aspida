import {
  mockDataArticles,
  mockDataArticleList,
  mockDataArticleIds,
  mockDataPagesOuter,
  mockDataPagesOuterPosts
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
const testApiName = 'posts';

describe('getSortedPagesData()', () => {
  it('should returns contents array with out contet filed', async () => {
    // aspida-mock 使う?
    fetchMock.mockResponseOnce(JSON.stringify(mockDataArticleList));
    expect(await getSortedPagesData(testApiName)).toStrictEqual([
      {
        id: 'mmmmmmmmm',
        createdAt: '2021-01-13T05:12.157Z',
        updatedAt: '2021-01-13T05:12.157Z',
        publishedAt: '2021-01-13T05:12.157Z',
        revisedAt: '2021-01-13T05:12.157Z',
        title: 'title4',
        category: [{ id: 'cat3', title: 'category3' }]
      },
      {
        id: 'zzzzzzzzz',
        createdAt: '2020-12-27T04:04:30.107Z',
        updatedAt: '2020-12-27T04:04:30.107Z',
        publishedAt: '2020-12-27T04:04:30.107Z',
        revisedAt: '2020-12-27T04:04:30.107Z',
        title: 'title3',
        category: []
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
        ]
      },
      {
        id: 'xxxxxxxxx',
        createdAt: '2020-12-26T12:25:43.532Z',
        updatedAt: '2020-12-26T12:27:22.533Z',
        publishedAt: '2020-12-26T12:27:22.533Z',
        revisedAt: '2020-12-26T12:27:22.533Z',
        title: 'title1',
        category: [{ id: 'cat2', title: 'category2' }]
      }
    ]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toContain('/posts?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,category.id,category.title'
    });
  });
});

describe('getAllPagesIds()', () => {
  it('should returns all ids', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockDataArticleIds));
    expect(await getAllPagesIds(testApiName)).toStrictEqual([
      'mmmmmmmmm',
      'zzzzzzzzz',
      'yyyyyy-da',
      'xxxxxxxxx'
    ]);
    expect(fetchMock.mock.calls[0][0]).toContain('/posts?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      fields: 'id'
    });
  });
});

describe('getPagesData()', () => {
  it('should returns content data of "zzzzzzzzz"', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify(
        mockDataArticles.contents.find(({ id }) => id === 'zzzzzzzzz')
      )
    );
    expect(
      await getPagesData(testApiName, { params: { id: 'zzzzzzzzz' } })
    ).toStrictEqual({
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
    });
    expect(fetchMock.mock.calls[0][0]).toContain('/posts/zzzzzzzzz?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      draftKey: '',
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,kind,description,mainImage,category.id,category.title,sections'
    });
  });
});

describe('getPagesPageData()', () => {
  it('should returns post data of "zzzzzzzzz"', async () => {
    fetchMock
      .mockResponseOnce(JSON.stringify(mockDataPagesOuter))
      .mockResponseOnce(
        JSON.stringify(
          mockDataArticles.contents.find(({ id }) => id === 'zzzzzzzzz')
        )
      );
    expect(
      await getPagesPageData(testApiName, { params: { id: 'zzzzzzzzz' } })
    ).toEqual({
      id: 'zzzzzzzzz',
      updated: '2020-12-27T04:04:30.107Z',
      title: 'title3',
      description: 'my starter home page',
      mainImage: '',
      allCategory: [],
      category: [],
      header: [],
      top: [],
      sections: [
        {
          title: '',
          content: [
            {
              kind: 'html',
              contentHtml: [
                {
                  tagName: 'p',
                  attribs: {},
                  html: 'content3'
                }
              ]
            }
          ]
        }
      ],
      bottom: [],
      footer: [
        {
          title: 'language & library',
          content: [
            {
              kind: 'html',
              contentHtml: [
                {
                  tagName: 'ul',
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
          content: [
            {
              kind: 'html',
              contentHtml: [
                {
                  tagName: 'ul',
                  attribs: {},
                  html: '<li>hot mock</li>'
                }
              ]
            }
          ]
        },
        {
          title: '',
          content: [
            {
              kind: 'html',
              contentHtml: [
                {
                  tagName: 'hr',
                  attribs: {},
                  html: ''
                },
                { tagName: 'p', attribs: {}, html: 'My Starter' }
              ]
            }
          ]
        }
      ]
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    // pages から globalとの取得.
    expect(fetchMock.mock.calls[0][0]).toContain('/pages?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      ids: '_global',
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,kind,description,mainImage,category.id,category.title,sections'
    });
    // posts から記事ページ(zzzzzzzzz)) の取得. -> getPagesPageData で指定した id
    expect(fetchMock.mock.calls[1][0]).toContain('/posts/zzzzzzzzz?');
    expect(queryParams(String(fetchMock.mock.calls[1][0]))).toStrictEqual({
      draftKey: '',
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,kind,description,mainImage,category.id,category.title,sections'
    });
  });
  it('should returns post data of "mmmmmmmmm" (markdown) with outer', async () => {
    fetchMock
      .mockResponseOnce(JSON.stringify(mockDataPagesOuterPosts))
      .mockResponseOnce(
        JSON.stringify(
          mockDataArticles.contents.find(({ id }) => id === 'mmmmmmmmm')
        )
      );
    expect(
      await getPagesPageData(
        testApiName,
        { params: { id: 'mmmmmmmmm' } },
        { outerIds: ['blog-posts'] }
      )
    ).toEqual({
      id: 'mmmmmmmmm',
      updated: '2021-01-13T05:12.157Z',
      title: 'title4',
      description: 'my starter home page',
      mainImage: '',
      allCategory: [
        { id: 'cat1', title: 'Category1' },
        { id: 'cat2', title: 'Category2' },
        { id: 'cat3', title: 'Category3' }
      ],
      category: [{ id: 'cat3', title: 'category3' }],
      header: [],
      top: [
        {
          title: '',
          content: [
            {
              kind: 'html',
              contentHtml: [
                {
                  tagName: 'p',
                  attribs: {},
                  html: 'post top'
                },
                {
                  tagName: 'hr',
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
          title: '',
          content: [
            {
              kind: 'html',
              contentHtml: [
                {
                  tagName: 'p',
                  attribs: {},
                  html: 'markdown content'
                }
              ]
            }
          ]
        }
      ],
      bottom: [
        {
          title: '',
          content: [
            {
              kind: 'html',
              contentHtml: [
                {
                  tagName: 'hr',
                  attribs: {},
                  html: ''
                },
                {
                  tagName: 'p',
                  attribs: {},
                  html: 'post bottom'
                }
              ]
            }
          ]
        }
      ],
      footer: [
        {
          title: 'language & library',
          content: [
            {
              kind: 'html',
              contentHtml: [
                {
                  tagName: 'ul',
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
          content: [
            {
              kind: 'html',
              contentHtml: [
                {
                  tagName: 'ul',
                  attribs: {},
                  html: '<li>hot mock</li>'
                }
              ]
            }
          ]
        },
        {
          title: '',
          content: [
            {
              kind: 'html',
              contentHtml: [
                {
                  tagName: 'hr',
                  attribs: {},
                  html: ''
                },
                { tagName: 'p', attribs: {}, html: 'My Starter' }
              ]
            }
          ]
        }
      ]
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    // pages から globalと bolg-posts(outer) の取得.
    expect(fetchMock.mock.calls[0][0]).toContain('/pages?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      ids: '_global,blog-posts',
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,kind,description,mainImage,category.id,category.title,sections'
    });
    // posts から記事ページ(mmmmmmmmm)) の取得. -> getPagesPageData で指定した id
    expect(fetchMock.mock.calls[1][0]).toContain('/posts/mmmmmmmmm?');
    expect(queryParams(String(fetchMock.mock.calls[1][0]))).toStrictEqual({
      draftKey: '',
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,kind,description,mainImage,category.id,category.title,sections'
    });
  });
});
