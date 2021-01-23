import { GetStaticProps, GetStaticPaths } from 'next';
import ErrorPage from 'next/error';
import { makeStyles } from '@material-ui/core';
import Layout from '../../../components/Layout';
import Link from '../../../components/Link';
import Box from '@material-ui/core/Box';
import { PageData } from '../../../types/pageTypes';
import { getAllPagesIds, getPagesPageData } from '../../../lib/pages';
import SectionList from '../../../components/SectionList';
import PageContext from '../../../components/PageContext';
// import classes from '*.module.css';

const useStyles = makeStyles(() => ({
  'SectionItem-root': {},
  'SectionItem-title': {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
}));

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
                    kind: 'partsPageTitle',
                    link: ''
                  },
                  {
                    kind: 'partsUpdated'
                  }
                ]
              }
            ]}
            classes={{ ...classes }}
          />
          <SectionList sections={pageData.top} classes={{ ...classes }} />
          <SectionList sections={pageData.sections} classes={{ ...classes }} />
          <SectionList sections={pageData.bottom} classes={{ ...classes }} />
        </Box>
        <Link href="/posts">{'Back to posts'}</Link>
      </Layout>
    </PageContext.Provider>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPagesIds('category');
  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const pageData = await getPagesPageData('category', context, {
    outerIds: ['blog-category'],
    defaultApiNameArticle: 'posts' as const
  });
  return {
    props: {
      pageData,
      preview: context.preview ? context.preview : null
    }
  };
};