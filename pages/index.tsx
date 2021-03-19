import { GetStaticProps } from 'next';
//import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/Layout';
import { PageData } from '../types/pageTypes';
import { getPagesPageData } from '../lib/pages';
import PageContext from '../components/PageContext';

// const useStyles = makeStyles(() => ({
// }));

const IndexPage = ({ pageData }: { pageData: PageData }) => {
  // const classes = useStyles();
  return (
    <PageContext.Provider value={pageData}>
      <Layout home pageData={pageData}></Layout>
    </PageContext.Provider>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const pageData = await getPagesPageData('pages', {
    params: { id: 'home' },
    preview: context.preview,
    previewData: context.previewData
  });
  return {
    props: {
      pageData
    }
  };
};
