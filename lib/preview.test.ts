import {
  mockDataPagesOuterHome,
  mockDataArticleList,
  mockDataArticleCat2,
  mockDataPagesOuterPosts,
  mockDataArticleLContent
} from '../test/testMockData';
import { FetchMock } from 'jest-fetch-mock';
import siteServerSideConfig from '../src/site.server-side-config';
import { getPagesPageData } from './pages';
import {
  queryParams,
  mockNextApiRequest,
  mockNextApiResponse
} from '../test/testUtils';
import { previewSetupHandler, applyPreviewDataToIdQuery } from './preview';
import handlerEnter from '../pages/api/enter-preview/[apiName]';
import handlerExit from '../pages/api/exit-preview';

// https://github.com/jefflau/jest-fetch-mock/issues/83
const fetchMock = fetch as FetchMock;
beforeEach(() => {
  fetchMock.resetMocks();
});

// ./preview.ts のテストの他に以下のテストも兼ねている.
// - context に preview 関連の値があった場合の pages と posts api の挙動のテスト ..
// - preview 用の api route のテスト.

describe('previewSetupHandler()', () => {
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
    const fn = jest.fn();
    const req = mockNextApiRequest(reqQuery);
    const res = mockNextApiResponse();
    await previewSetupHandler(fn)(req, res);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toContain('/posts/abcdefg-123?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      fields: 'id',
      draftKey: 'qqqqqq-56'
    });
    expect(res.setPreviewData).toHaveBeenCalledTimes(1);
    expect(res.setPreviewData.mock.calls[0][0]).toStrictEqual({
      apiName: 'posts',
      slug: 'abcdefg-123',
      draftKey: 'qqqqqq-56'
    });
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn.mock.calls[0][0]._mockName).toStrictEqual('mockNextApiRequest');
    expect(fn.mock.calls[0][1]._mockName).toStrictEqual('mockNextApiResponse');
    expect(fn.mock.calls[0][2]).toStrictEqual('abcdefg-123');
  });
  it('should entering has been failed by invalid previewSecret', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ id: 'abcdefg-123', draftKey: 'qqqqqq-56' })
    );
    const reqQuery = {
      previewSecret: 'invalid',
      apiName: 'posts',
      slug: 'abcdefg-123',
      draftKey: 'qqqqqq-56'
    };
    const fn = jest.fn();
    const req = mockNextApiRequest(reqQuery);
    const res = mockNextApiResponse();
    await previewSetupHandler(fn)(req, res);
    expect(fetchMock).toHaveBeenCalledTimes(0);
    expect(res.setPreviewData).toHaveBeenCalledTimes(0);
    expect(fn).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status.mock.calls[0][0]).toStrictEqual(404);
    expect(res.end).toHaveBeenCalledTimes(1);
    expect(res.end.mock.calls[0][0]).toBeUndefined();
  });
  it('should entering has been failed by invalid apiName', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ id: 'abcdefg-123', draftKey: 'qqqqqq-56' })
    );
    const reqQuery = {
      previewSecret,
      apiName: 'invalid',
      slug: 'abcdefg-123',
      draftKey: 'qqqqqq-56'
    };
    const fn = jest.fn();
    const req = mockNextApiRequest(reqQuery);
    const res = mockNextApiResponse();
    await previewSetupHandler(fn)(req, res);
    expect(fetchMock).toHaveBeenCalledTimes(0);
    expect(res.setPreviewData).toHaveBeenCalledTimes(0);
    expect(fn).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status.mock.calls[0][0]).toStrictEqual(404);
    expect(res.end).toHaveBeenCalledTimes(1);
    expect(res.end.mock.calls[0][0]).toBeUndefined();
  });
  it('should entering has been failed by error from fetch', async () => {
    // get api で slug / draftKey の指定ミスをした場合は  HTTP/2 404
    fetchMock.mockResponses([JSON.stringify({}), { status: 404 }]);
    const reqQuery = {
      previewSecret,
      apiName: 'posts',
      slug: 'abcdefg-123',
      draftKey: 'qqqqqq-56'
    };
    const fn = jest.fn();
    const req = mockNextApiRequest(reqQuery);
    const res = mockNextApiResponse();
    await previewSetupHandler(fn)(req, res);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(res.setPreviewData).toHaveBeenCalledTimes(0);
    expect(fn).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status.mock.calls[0][0]).toStrictEqual(401);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json.mock.calls[0][0]).toStrictEqual({
      message: 'Invalid slug / draftKey'
    });
  });
});

describe('applyPreviewDataToIdQuery()', () => {
  it('should apply preview data to id and query ', () => {
    const previewData = {
      apiName: 'posts',
      slug: 'test-slug',
      draftKey: 'test-key'
    };
    expect(
      applyPreviewDataToIdQuery(true, previewData, 'posts', 'test-id', {
        fields: 'id'
      })
    ).toStrictEqual(['test-slug', { fields: 'id', draftKey: 'test-key' }]);
  });
  it('should not apply preview data to id and query ', () => {
    const previewData = {
      apiName: 'posts',
      slug: 'test-slug',
      draftKey: 'test-key'
    };
    expect(
      applyPreviewDataToIdQuery(false, previewData, 'posts', 'test-id', {
        fields: 'id'
      })
    ).toStrictEqual(['test-id', { fields: 'id' }]);
    expect(
      applyPreviewDataToIdQuery(false, undefined, 'posts', 'test-id', {
        fields: 'id'
      })
    ).toStrictEqual(['test-id', { fields: 'id' }]);
    expect(
      applyPreviewDataToIdQuery(false, {}, 'posts', 'test-id', {
        fields: 'id'
      })
    ).toStrictEqual(['test-id', { fields: 'id' }]);
    expect(
      applyPreviewDataToIdQuery(true, previewData, 'pages', 'test-id', {
        fields: 'id'
      })
    ).toStrictEqual(['test-id', { fields: 'id' }]);
  });
});

describe('getPagesPageData()', () => {
  it('should get posts with draftKey', async () => {
    fetchMock
      .mockResponseOnce(JSON.stringify(mockDataPagesOuterHome))
      .mockResponseOnce(JSON.stringify(mockDataArticleList))
      .mockResponseOnce(JSON.stringify(mockDataArticleCat2));
    await getPagesPageData('pages', {
      params: { id: 'home' },
      preview: true,
      previewData: {
        apiName: 'pages',
        slug: 'home',
        draftKey: 'qqqqqq-56'
      }
    });

    expect(fetchMock).toHaveBeenCalledTimes(3);
    // pages から global と home の取得. ここでは draftKey が使われる
    expect(fetchMock.mock.calls[0][0]).toContain('/pages?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      ids: `${siteServerSideConfig.globalPageId},home`,
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
    await getPagesPageData(
      'posts',
      {
        params: { id: 'abcdefg' },
        preview: true,
        previewData: {
          apiName: 'posts',
          slug: 'abcdefg-123',
          draftKey: 'qqqqqq-56'
        }
      },
      {
        outerIds: ['blog-posts']
      }
    );

    expect(fetchMock).toHaveBeenCalledTimes(2);
    // pages から global と home の取得. ここでは draftKey が使われない.
    expect(fetchMock.mock.calls[0][0]).toContain('/pages?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      ids: `${siteServerSideConfig.globalPageId},blog-posts`,
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

  it('should get posts outer with draftKey', async () => {
    fetchMock
      .mockResponseOnce(JSON.stringify(mockDataPagesOuterPosts))
      .mockResponseOnce(JSON.stringify(mockDataArticleLContent));
    await getPagesPageData(
      'posts',
      {
        params: { id: 'abcdefg' },
        preview: true,
        previewData: {
          apiName: 'pages',
          slug: 'posts-outer',
          draftKey: 'qqqqqq-56'
        }
      },
      {
        outerIds: ['blog-posts']
      }
    );

    expect(fetchMock).toHaveBeenCalledTimes(2);
    // pages から global と home の取得. getPagesPageData は  posts で実行しているが、
    // preview の api は pages なので draftKey が使われる
    expect(fetchMock.mock.calls[0][0]).toContain('/pages?');
    expect(queryParams(String(fetchMock.mock.calls[0][0]))).toStrictEqual({
      ids: `${siteServerSideConfig.globalPageId},blog-posts`,
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,kind,description,mainImage,category.id,category.title,sections',

      draftKey: 'qqqqqq-56'
    });
    // posts から artcles の取得. preview の api ではないので、slug も draftKey も使われない
    expect(fetchMock.mock.calls[1][0]).toContain('/posts/abcdefg?');
    expect(queryParams(String(fetchMock.mock.calls[1][0]))).toStrictEqual({
      fields:
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,kind,description,mainImage,category.id,category.title,sections'
    });
  });
});

describe('apienter-.preview[apiName].handler()', () => {
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

    // redirect で振られるところだけチェック:
    expect(res.writeHead).toHaveBeenCalledTimes(1);
    expect(res.writeHead.mock.calls[0][0]).toStrictEqual(307);
    expect(res.writeHead.mock.calls[0][1]).toStrictEqual({
      Location: '/posts/abcdefg-123'
    });
    expect(res.end).toHaveBeenCalledTimes(1);
    expect(res.end.mock.calls[0][0]).toStrictEqual('Preview mode enabled');
  });
});

describe('api.exit-previee.handler()', () => {
  it('should exit preview mode', async () => {
    const req = mockNextApiRequest({});
    const res = mockNextApiResponse();
    await handlerExit(req, res);

    // preview context がクリアされる
    expect(res.clearPreviewData).toHaveBeenCalledTimes(1);
    // redirect で '/' に振られる
    expect(res.writeHead).toHaveBeenCalledTimes(1);
    expect(res.writeHead.mock.calls[0][0]).toStrictEqual(307);
    expect(res.writeHead.mock.calls[0][1]).toStrictEqual({
      Location: '/'
    });
    expect(res.end).toHaveBeenCalledTimes(1);
    expect(res.end.mock.calls[0][0]).toBeUndefined();
  });
});
