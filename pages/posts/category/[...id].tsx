import { GetStaticProps, GetStaticPaths } from 'next';
import ErrorPage from 'next/error';
import { makeStyles } from '@material-ui/core';
import Layout from '../../../components/Layout';
import Link from '../../../components/Link';
import { PageData } from '../../../types/pageTypes';
import {
  getPagesPageData,
  getPagesData,
  getAllCategolizedPaginationIds
} from '../../../lib/pages';
import SectionList from '../../../components/SectionList';
import siteConfig from '../../../src/site.config';
import { wrapStyle } from '../../../utils/classes';
import PageContext from '../../../components/PageContext';
// import classes from '*.module.css';

const useStyles = makeStyles(() => ({
  pageMain: {
    ...wrapStyle(`& .${siteConfig.iamgeConfig.contentImageClassName}`, {
      maxWidth: '100%',
      objectFit: 'contain'
    })
  },
  'SectionItem-root': {},
  'SectionItem-title': {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
}));

const itemsPerPage = 10;
const pagePath = ['page'];

export default function Post({
  pageData
}: {
  pageData: PageData;
  preview: boolean;
}) {
  const classes = useStyles();
  if (!pageData) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <PageContext.Provider value={pageData}>
      <Layout title={pageData.title} pageData={pageData}>
        <SectionList
          sections={[
            {
              title: '',
              content: [
                {
                  kind: 'partsNavCategory',
                  all: true,
                  categoryPath: '/posts/category'
                }
              ]
            },
            {
              title: '',
              content: [
                {
                  kind: 'partsNavPagination',
                  // section 側で展開した場合、取得できない情報が含まれている.
                  // コンテンツ側で parts 指定することにした場合扱えないので注意
                  href: '/posts/page/[..id]',
                  baseAs: '/posts/page',
                  pagePath: pagePath,
                  firstPageHref: '/posts'
                }
              ]
            }
          ]}
          classes={{ ...classes }}
        />
        <Link href="/posts">{'Back to posts'}</Link>
      </Layout>
    </PageContext.Provider>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const category = (
    await getPagesData('pages', {
      params: { id: 'blog-category' }
    })
  ).category.map(({ id }) => id);
  const paths = (
    await getAllCategolizedPaginationIds(
      'posts',
      category,
      itemsPerPage,
      pagePath
    )
  ).map((id) => ({
    params: { id: id }
  }));
  // console.log('paths');
  // paths.forEach((p) => console.log(p.params));

  return {
    paths,
    fallback: process.env.USE_FALLBACK ? true : false
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  // /path/to/category/[id as cat][id as 'page'][id] となっているので、そのように分割.
  // ユーティリティにすることも考える?
  const id = context.params?.id || [''];
  const idLen = id.length;
  const pageNo = idLen > 1 ? parseInt(id[idLen - 1], 10) : 1;
  const curCategory = id[0];
  const pageData = await getPagesPageData(
    'category',
    { ...context, params: { id: id[0] } },
    {
      outerIds: ['blog-category'],
      articlesApi: 'posts',
      curCategory,
      itemsPerPage,
      pageNo
    }
  );
  return {
    props: {
      pageData,
      preview: context.preview ? context.preview : null
    }
  };
};
