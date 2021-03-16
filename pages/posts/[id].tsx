import { GetStaticProps, GetStaticPaths } from 'next';
import ErrorPage from 'next/error';
import { makeStyles } from '@material-ui/core';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import Box from '@material-ui/core/Box';
import { PageData } from '../../types/pageTypes';
import { getAllPagesIds, getPagesPageData } from '../../lib/pages';
import { mergeSectionConfig } from '../../components/SectionContext';
import SectionList from '../../components/SectionList';
import siteConfig from '../../src/site.config';
import { wrapStyle } from '../../utils/classes';
import PageContext from '../../components/PageContext';
// import classes from '*.module.css';

const useStyles = makeStyles(() => ({
  pageMain: {
    ...wrapStyle(`& .${siteConfig.iamgeConfig.contentImageClassName}`, {
      maxWidth: '100%',
      objectFit: 'scale-down'
    })
  },
  'SectionItem-root': {},
  'SectionItem-title': {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
}));

const sectionConfigInPosts = mergeSectionConfig({
  naked: true
});

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
      <Layout
        headerSections={pageData.header}
        title={pageData.title}
        footerSections={pageData.footer}
      >
        <Box my={1}>
          <SectionList
            sections={[
              {
                title: '',
                content: [
                  {
                    kind: 'partsNavBreadcrumbs',
                    lastBreadcrumb: pageData.title
                  },
                  {
                    kind: 'partsPageTitle',
                    link: ''
                  },
                  {
                    kind: 'partsUpdated'
                  },
                  {
                    kind: 'partsNavContentToc'
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
              config={sectionConfigInPosts}
              classes={{ ...classes }}
            />
          </Box>
          <SectionList
            sections={[
              {
                title: '',
                content: [
                  {
                    kind: 'partsNavCategory',
                    all: false,
                    categoryPath: '/posts/category'
                  }
                ]
              }
            ]}
            classes={{ ...classes }}
          />
          <SectionList sections={pageData.bottom} classes={{ ...classes }} />
        </Box>
        <Link href="/posts">{'Back to posts'}</Link>
      </Layout>
    </PageContext.Provider>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await getAllPagesIds('posts')).map((id) => ({
    params: { id }
  }));
  return {
    paths,
    fallback: process.env.USE_FALLBACK ? true : false
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const pageData = await getPagesPageData('posts', context, {
    outerIds: ['blog-posts']
  });
  return {
    props: {
      pageData,
      preview: context.preview ? context.preview : null
    }
  };
};
