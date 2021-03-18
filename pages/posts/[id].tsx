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

const useStyles = makeStyles((theme) => ({
  pageMain: {
    ...wrapStyle(`& .${siteConfig.iamgeConfig.contentImageClassName}`, {
      maxWidth: '100%',
      height: '100%',
      objectFit: 'scale-down'
    }),
    maxWidth: theme.breakpoints.values.sm
  },
const useSectionStyles = makeStyles((theme) => ({
  'SectionItem-root': {},
  'SectionItem-title': {}
}));

const useNoneUpMdStyles = makeStyles((theme) => ({
  'NavContentToc-root': {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
    width: '100%'
  }
}));

// const useDispUpMdStyles = makeStyles((theme) => ({
//   'NavContentToc-root': {
//     [theme.breakpoints.up('md')]: {
//       display: 'none'
//     },
//     width: '100%'
//   }
// }));

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
  const classesSection = useSectionStyles();
  const classesNoneUpMd = useNoneUpMdStyles();
  // const classesDispUpMd = useDispUpMdStyles();
  if (!pageData) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <PageContext.Provider value={pageData}>
      <Layout
        headerSections={pageData.header}
        title={pageData.title}
        topSections={pageData.top}
        bottomSections={[
          {
            title: '',
            content: [
              {
                kind: 'partsNavContentToc'
              }
            ]
          },
          ...pageData.bottom
        ]}
        footerSections={pageData.footer}
      >
        <SectionList
          sections={[
            {
              title: '',
              content: [
                {
                  kind: 'partsNavBreadcrumbs',
                  lastBreadcrumb: pageData.title
                }
              ]
            }
          ]}
          classes={{ ...classesSection }}
        />
        <Box component="section" className={classes.pageMain}>
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
                  },
                  {
                    kind: 'partsNavContentToc'
                  }
                ]
              }
            ]}
            config={sectionConfigInPosts}
            classes={{ ...classesSection }}
          />
          <Box display="block" component="article">
            <SectionList
              sections={[
                {
                  title: '',
                  content: [
                    {
                      kind: 'partsNavContentToc'
                    }
                  ]
                },
                ...pageData.sections
              ]}
              config={sectionConfigInPosts}
              classes={{ ...classesSection, ...classesNoneUpMd }}
            />
          </Box>
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
          classes={{ ...classesSection }}
        />
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
