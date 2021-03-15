import { mockMiddleware } from 'aspida-mock';
import {
  mockDataPagesIds,
  mockDataPagesList,
  mockDataArticleIds,
  mockDataArticleList,
  mockDataPagesOuterHome,
  mockDataPagesOuterBlog,
  mockDataPagesOuterPosts,
  mockDataPagesOuterCategory,
  mockDataCategoryIds,
  mockDataCategoryList
} from './mockData';
import siteServerSideConfig from '../../src/site.server-side-config';

// polymorph 対応
export default mockMiddleware([
  (req, res, next) =>
    req.path === '/api/v1/pages' &&
    req.method === 'GET' &&
    req.query?.ids === `${siteServerSideConfig.globalPageId},home`
      ? res({
          status: 200,
          resBody: mockDataPagesOuterHome
        })
      : next(),
  (req, res, next) =>
    req.path === '/api/v1/pages' &&
    req.method === 'GET' &&
    req.query?.ids === `${siteServerSideConfig.globalPageId},blog`
      ? res({
          status: 200,
          resBody: mockDataPagesOuterBlog
        })
      : next(),
  (req, res, next) =>
    req.path === '/api/v1/pages' &&
    req.method === 'GET' &&
    req.query?.ids === `${siteServerSideConfig.globalPageId},blog-posts`
      ? res({
          status: 200,
          resBody: mockDataPagesOuterPosts
        })
      : next(),
  (req, res, next) =>
    req.path === '/api/v1/pages' &&
    req.method === 'GET' &&
    req.query?.ids === `${siteServerSideConfig.globalPageId},blog-category`
      ? res({
          status: 200,
          resBody: mockDataPagesOuterCategory
        })
      : next(),
  (req, res, next) =>
    req.path === '/api/v1/pages' &&
    req.method === 'GET' &&
    req.query?.fields === 'id'
      ? res({
          status: 200,
          resBody: mockDataPagesIds
        })
      : next(),
  (req, res, next) =>
    req.path === '/api/v1/pages' &&
    req.method === 'GET' &&
    req.query?.fields ===
      'id,createdAt,updatedAt,publishedAt,revisedAt,title,category.id,category.title'
      ? res({
          status: 200,
          resBody: mockDataPagesList
        })
      : next(),
  (req, res, next) => {
    if (
      req.path === '/api/v1/posts' &&
      req.method === 'GET' &&
      req.query?.fields === 'id'
    ) {
      const m = (req.query.filters || '').match(/category\[contains\](.+)$/);
      const limit = req.query.limit === undefined ? 10 : req.query.limit;
      const offset = req.query.offset === undefined ? 0 : req.query.offset;
      if (m) {
        const contents = mockDataArticleList.contents.filter(({ category }) =>
          category.some(({ id }) => id === m[1])
        );
        res({
          status: 200,
          resBody: {
            ...mockDataArticleIds,
            contents: contents
              .map(({ id }) => ({ id }))
              .slice(offset, offset + limit),
            totalCount: contents.length
          }
        });
        return;
      } else {
        res({
          status: 200,
          resBody: {
            ...mockDataArticleIds,
            contents: mockDataArticleIds.contents.slice(offset, offset + limit)
          }
        });
        return;
      }
    }
    next();
  },
  (req, res, next) => {
    if (
      req.path === '/api/v1/posts' &&
      req.method === 'GET' &&
      req.query?.fields ===
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,category.id,category.title'
    ) {
      const m = (req.query.filters || '').match(/category\[contains\](.+)$/);
      const limit = req.query.limit === undefined ? 10 : req.query.limit;
      const offset = req.query.offset === undefined ? 0 : req.query.offset;
      if (m) {
        const contents = mockDataArticleList.contents.filter(({ category }) =>
          category.some(({ id }) => id === m[1])
        );
        res({
          status: 200,
          resBody: {
            ...mockDataArticleList,
            contents: contents.slice(offset, offset + limit),
            totalCount: contents.length
          }
        });
        return;
      } else {
        res({
          status: 200,
          resBody: {
            ...mockDataArticleList,
            contents: mockDataArticleList.contents.slice(offset, offset + limit)
          }
        });
        return;
      }
    }
    next();
  },
  // category でリスト系は実行されないはずだが、とりあえず
  (req, res, next) =>
    req.path === '/api/v1/category' &&
    req.method === 'GET' &&
    req.query?.fields === 'id'
      ? res({
          status: 200,
          resBody: mockDataCategoryIds
        })
      : next(),
  (req, res, next) =>
    req.path === '/api/v1/category' &&
    req.method === 'GET' &&
    req.query?.fields ===
      'id,createdAt,updatedAt,publishedAt,revisedAt,title,category.id,category.title'
      ? res({
          status: 200,
          resBody: mockDataCategoryList
        })
      : next()
]);
