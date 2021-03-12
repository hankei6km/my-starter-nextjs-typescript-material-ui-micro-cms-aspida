import { GetStaticProps, GetStaticPaths } from 'next';
import ErrorPage from 'next/error';
import { makeStyles } from '@material-ui/core';
import Layout from '../../../components/Layout';
import Link from '../../../components/Link';
import Box from '@material-ui/core/Box';
import { PageData } from '../../../types/pageTypes';
import { getPagesPageData, getAllPaginationIds } from '../../../lib/pages';
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
const pagePath: string[] = [];

// このページは /pages/posts/index.tsx とほぼ同じ.
// (category では [...id].tsx で同じファイルで処理できている)
export default function Page({
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
      <Layout
        headerSections={pageData.header}
        title={pageData.title}
        footerSections={pageData.footer}
      >
        <Box my={1}>
          <SectionList
            sections={[
              {
                tocItems: [],
                title: '',
                content: [
                  {
                    kind: 'partsNavCategory',
                    all: true,
                    categoryPath: '/posts/category'
                  },
                  {
                    kind: 'partsPageTitle',
                    link: ''
                  }
                ]
              }
            ]}
            classes={{ ...classes }}
          />
          <SectionList sections={pageData.top} classes={{ ...classes }} />
          <Box className={classes.pageMain}>
            <SectionList
              sections={pageData.sections}
              classes={{ ...classes }}
            />
          </Box>
          <SectionList sections={pageData.bottom} classes={{ ...classes }} />
          <SectionList
            sections={[
              {
                tocItems: [],
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
        </Box>
        <Link href="/posts">{'Back to posts'}</Link>
      </Layout>
    </PageContext.Provider>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (
    await getAllPaginationIds('posts', itemsPerPage, pagePath)
  ).map((id) => ({
    params: { id: id[0] }
  }));
  // console.log('paths');
  // paths.forEach((p) => console.log(p.params));

  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = typeof context.params?.id === 'string' ? context.params.id : '';
  const pageNo = id !== '' ? parseInt(id, 10) : 1;
  const curCategory = '';
  const pageData = await getPagesPageData(
    'pages',
    { ...context, params: { id: 'blog' } },
    {
      outerIds: [],
      articlesApi: 'posts',
      curCategory,
      itemsPerPage,
      pageNo
    }
  );
  return {
    props: {
      pageData
    }
  };
};
