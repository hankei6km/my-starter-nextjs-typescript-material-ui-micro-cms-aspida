import {
  mockDataPagesOuterHome,
  mockDataArticleList,
  mockDataArticleCat2,
  mockDataPagesOuterPosts,
  mockDataArticleLContent
} from '../test/testMockData';
import { FetchMock } from 'jest-fetch-mock';
import { getPagesPageData } from './pages';
import {
  queryParams,
  mockNextApiRequest,
  mockNextApiResponse
} from '../test/testUtils';
import handlerEnter from '../pages/api/enter-preview/[apiName]';

// https://github.com/jefflau/jest-fetch-mock/issues/83
const fetchMock = fetch as FetchMock;
beforeEach(() => {
  fetchMock.resetMocks();
});

// context に preview 関連の値があった場合の pages と posts api の挙動のテスト ..
// preview 用の api route のテスト.

describe('getPagesPageData()', () => {
  it('should get pages with draftKey', async () => {
    fetchMock
      .mockResponseOnce(JSON.stringify(mockDataPagesOuterHome))
      .mockResponseOnce(JSON.stringify(mockDataArticleList))
      .mockResponseOnce(JSON.stringify(mockDataArticleCat2));
    await getPagesPageData('pages', {
      params: { id: 'home' },
      preview: true,
      previewData: {
        slug: 'abcdefg-123',
        draftKey: 'qqqqqq-56'
      }
    });

    expect(fetchMock).toHaveBeenCalledTimes(3);
    // pages から global と home の取得. ここでは draftKey が使われる
    expect(fetchMock.mock.calls[0][0]).toContain('/pages?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      ids: '_global,home',
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,kind,description,mainImage,category.id,category.title,sections',
      draftKey: 'qqqqqq-56'
    });
    // posts から artcles の取得. ここでは  draftKey は使われない
    expect(fetchMock.mock.calls[1][0]).toContain('/posts?');
    expect(queryParams(String(fetchMock.mock.calls[1][0]))).toStrictEqual({
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,category.id,category.title'
    });
  });
  it('should get posts with draftKey', async () => {
    fetchMock
      .mockResponseOnce(JSON.stringify(mockDataPagesOuterPosts))
      .mockResponseOnce(JSON.stringify(mockDataArticleLContent));
    await getPagesPageData('posts', {
      params: { id: 'abcdefg' },
      preview: true,
      previewData: {
        slug: 'abcdefg-123',
        draftKey: 'qqqqqq-56'
      }
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    // pages から global と home の取得. ここでは draftKey が使われない.
    expect(fetchMock.mock.calls[0][0]).toContain('/pages?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      ids: '_global',
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,kind,description,mainImage,category.id,category.title,sections'
    });
    // posts から artcles の取得. id として slug が使われる.
    // ここでは  draftKey が使われる.
    expect(fetchMock.mock.calls[1][0]).toContain('/posts/abcdefg-123?');
    expect(queryParams(String(fetchMock.mock.calls[1][0]))).toStrictEqual({
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,kind,description,mainImage,category.id,category.title,sections',
      draftKey: 'qqqqqq-56'
    });
  });
});

describe('api.preview-enter[apiName].handler()', () => {
  const previewSecret = 'test-secret';
  // https://stackoverflow.com/questions/48033841/test-process-env-with-jest
  const OLD_ENV = process.env;
  beforeEach(() => {
    process.env = { ...OLD_ENV, PREVIEW_SECRET: previewSecret };
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should enter preview mode', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ id: 'abcdefg-123', draftKey: 'qqqqqq-56' })
    );
    const reqQuery = {
      previewSecret,
      apiName: 'posts',
      slug: 'abcdefg-123',
      draftKey: 'qqqqqq-56'
    };
    const req = mockNextApiRequest(reqQuery);
    const res = mockNextApiResponse();
    await handlerEnter(req, res);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    // pages から global と home の取得. ここでは draftKey が使われない.
    expect(fetchMock.mock.calls[0][0]).toContain('/posts/abcdefg-123?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      fields: 'id',
      draftKey: 'qqqqqq-56'
    });
    expect(res.setPreviewData).toHaveBeenCalledTimes(1);
    expect(res.setPreviewData.mock.calls[0][0]).toStrictEqual({
      slug: 'abcdefg-123',
      draftKey: 'qqqqqq-56'
    });
    expect(res.writeHead).toHaveBeenCalledTimes(1);
    expect(res.writeHead.mock.calls[0][0]).toStrictEqual(307);
    expect(res.writeHead.mock.calls[0][1]).toStrictEqual({
      Location: '/posts/abcdefg-123'
    });
    expect(res.end).toHaveBeenCalledTimes(1);
    expect(res.end.mock.calls[0][0]).toStrictEqual('Preview mode enabled');
  });
});