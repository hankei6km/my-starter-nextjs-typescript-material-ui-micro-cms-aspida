import {
  mockDataArticles,
  mockDataArticleList,
  mockDataArticleIds,
  mockDataPagesOuter,
  mockDataPagesOuterPosts,
  mockDataArticleCat2Ids,
  mockDataPagination,
  mockDataPaginationCat1Ids,
  mockDataPaginationCat2Ids,
  mockDataPaginationCat3Ids
} from '../test/testMockData';
import { FetchMock } from 'jest-fetch-mock';
import siteServerSideConfig from '../src/site.server-side-config';
import {
  getSortedPagesData,
  getAllPagesIds,
  getPagesData,
  getPagesPageData,
  getAllPaginationIds,
  getAllCategolizedPaginationIds
} from './pages';
import { queryParams } from '../test/testUtils';

// https://github.com/jefflau/jest-fetch-mock/issues/83
const fetchMock = fetch as FetchMock;
beforeEach(() => {
  fetchMock.resetMocks();
});
const testApiName = 'posts';

describe('getSortedPagesData()', () => {
  it('should returns contents array with out contet field', async () => {
    // aspida-mock 使う?
    fetchMock.mockResponseOnce(JSON.stringify(mockDataArticleList));
    expect(await getSortedPagesData(testApiName)).toStrictEqual({
      contents: [
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
      ],
      totalCount: 4,
      offset: 0,
      limit: 120000
    });
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
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toContain('/posts?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      fields: 'id',
      limit: '120000'
    });
  });
  it('should returns filtered ids', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockDataArticleCat2Ids));
    expect(
      await getAllPagesIds(testApiName, {
        filters: 'category[cotains]cat2'
      })
    ).toStrictEqual(['yyyyyy-da', 'xxxxxxxxx']);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toContain('/posts?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      fields: 'id',
      limit: '120000',
      filters: 'category[cotains]cat2'
    });
  });
});

describe('getAllPaginationIds()', () => {
  it('should returns all pagination ids', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockDataPagination));
    const res = await getAllPaginationIds(testApiName, 10);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toContain('/posts?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      fields: 'id',
      limit: '0'
    });
    expect(res).toStrictEqual([
      ['1'],
      ['2'],
      ['3'],
      ['4'],
      ['5'],
      ['6'],
      ['7'],
      ['8'],
      ['9'],
      ['10'],
      ['11']
    ]);
  });
  it('should returns filtered pagination ids', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockDataPaginationCat2Ids));
    const res = await getAllPaginationIds(testApiName, 10, [], {
      filters: 'category[contains]cat2'
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toContain('/posts?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      fields: 'id',
      limit: '0',
      filters: 'category[contains]cat2'
    });
    expect(res).toStrictEqual([['1'], ['2'], ['3'], ['4'], ['5'], ['6']]);
  });
  it('should returns ids in deep path', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockDataPaginationCat2Ids));
    const res = await getAllPaginationIds(testApiName, 10, ['pages'], {
      filters: 'category[contains]cat2'
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toContain('/posts?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      fields: 'id',
      limit: '0',
      filters: 'category[contains]cat2'
    });
    expect(res).toStrictEqual([
      ['pages', '1'],
      ['pages', '2'],
      ['pages', '3'],
      ['pages', '4'],
      ['pages', '5'],
      ['pages', '6']
    ]);
  });
});

describe('getAllCategolizedPaginationIds()', () => {
  it('should returns all categolized pagination ids', async () => {
    fetchMock
      .mockResponseOnce(JSON.stringify(mockDataPaginationCat1Ids))
      .mockResponseOnce(JSON.stringify(mockDataPaginationCat2Ids))
      .mockResponseOnce(JSON.stringify(mockDataPaginationCat3Ids));
    const res = await getAllCategolizedPaginationIds(
      testApiName,
      ['cat1', 'cat2', 'cat3'],
      10
    );
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(fetchMock.mock.calls[0][0]).toContain('/posts?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      fields: 'id',
      limit: '0',
      filters: 'category[contains]cat1'
    });
    expect(fetchMock.mock.calls[1][0]).toContain('/posts?');
    expect(queryParams(String(fetchMock.mock.calls[1][0]))).toStrictEqual({
      fields: 'id',
      limit: '0',
      filters: 'category[contains]cat2'
    });
    expect(fetchMock.mock.calls[2][0]).toContain('/posts?');
    expect(queryParams(String(fetchMock.mock.calls[2][0]))).toStrictEqual({
      fields: 'id',
      limit: '0',
      filters: 'category[contains]cat3'
    });
    expect(res).toStrictEqual([
      ['cat1'],
      ['cat2'],
      ['cat3'],
      ['cat1', 'page', '1'],
      ['cat1', 'page', '2'],
      ['cat1', 'page', '3'],
      ['cat2', 'page', '1'],
      ['cat2', 'page', '2'],
      ['cat2', 'page', '3'],
      ['cat2', 'page', '4'],
      ['cat2', 'page', '5'],
      ['cat2', 'page', '6'],
      ['cat3', 'page', '1'],
      ['cat3', 'page', '2'],
      ['cat3', 'page', '3']
    ]);
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
      pageNo: 1,
      pageCount: -1,
      title: 'title3',
      description: 'my starter home page',
      mainImage: '',
      allCategory: [],
      category: [],
      curCategory: '',
      contentToc: {
        label: 'toc',
        items: []
      },
      header: [],
      top: [],
      sections: [
        {
          title: '',
          id: '',
          content: [
            {
              kind: 'html',
              contentHtml: [
                {
                  tagName: 'p',
                  style: {},
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
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    // pages から globalとの取得.
    expect(fetchMock.mock.calls[0][0]).toContain('/pages?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      ids: siteServerSideConfig.globalPageId,
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,kind,description,mainImage,category.id,category.title,sections'
    });
    // posts から記事ページ(zzzzzzzzz)) の取得. -> getPagesPageData で指定した id
    expect(fetchMock.mock.calls[1][0]).toContain('/posts/zzzzzzzzz?');
    expect(queryParams(String(fetchMock.mock.calls[1][0]))).toStrictEqual({
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
      pageNo: 1,
      pageCount: -1,
      title: 'title4',
      description: 'my starter home page',
      mainImage: '',
      allCategory: [
        { id: 'cat1', title: 'Category1' },
        { id: 'cat2', title: 'Category2' },
        { id: 'cat3', title: 'Category3' }
      ],
      category: [{ id: 'cat3', title: 'category3' }],
      curCategory: '',
      contentToc: {
        label: 'toc',
        items: []
      },
      header: [],
      top: [
        {
          title: '',
          id: '',
          content: [
            {
              kind: 'html',
              contentHtml: [
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'post top'
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
          title: '',
          id: '',
          content: [
            {
              kind: 'html',
              contentHtml: [
                {
                  tagName: 'p',
                  style: {},
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
                {
                  tagName: 'p',
                  style: {},
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
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    // pages から globalと bolg-posts(outer) の取得.
    expect(fetchMock.mock.calls[0][0]).toContain('/pages?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      ids: `${siteServerSideConfig.globalPageId},blog-posts`,
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,kind,description,mainImage,category.id,category.title,sections'
    });
    // posts から記事ページ(mmmmmmmmm)) の取得. -> getPagesPageData で指定した id
    expect(fetchMock.mock.calls[1][0]).toContain('/posts/mmmmmmmmm?');
    expect(queryParams(String(fetchMock.mock.calls[1][0]))).toStrictEqual({
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,kind,description,mainImage,category.id,category.title,sections'
    });
  });
});
