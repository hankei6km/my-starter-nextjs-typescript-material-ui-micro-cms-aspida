import React, { useContext, ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
// import Image from 'next/image';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import siteContext from '../components/SiteContext';
import { mergeSectionConfig } from '../components/SectionContext';
import { Section } from '../types/pageTypes';
import SectionList from './SectionList';
import { pruneClasses } from '../utils/classes';

const useStyles = makeStyles((theme) => ({
  'LayoutHeader-root': {},
  'LayoutHeader-sectionTop': {},
  'LayoutHeader-sectionList': {},
  'LayoutContaienr-root': {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  'LayoutContaienr-body': {
    flexGrow: 1,
    maxWidth: theme.breakpoints.values.sm
  },
  'LayoutContaienrTop-sectionList': {
    width: 300
  },
  'LayoutContaienrBottom-sectionList': {
    width: 300
  },
  'LayoutContaienrTop-sectionList-inner': { position: 'sticky', top: 50 },
  'LayoutContaienrBottom-sectionList-inner': { position: 'sticky', top: 50 },
  'LayoutFooter-root': {},
  'LayoutFooter-sectionList': {},
  'LayoutFooter-sectionBottom': {},
  heading: {
    // fontFamily:
    //   '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    fontWeight: 800
  }
}));

const useStylesHeader = makeStyles(() => ({
  'SectionItem-root': {
    display: 'flex',
    alignItems: 'center'
  },
  'SiteTitle-link': {
    opacity: 1,
    '&:hover': { textDecorationLine: 'none', opacity: 1 }
  },
  'SiteLogo-link': {
    opacity: 1,
    '&:hover': { textDecorationLine: 'none', opacity: 1 }
  }
}));
const useStylesGrid = makeStyles(() => ({
  'SectionList-root': {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)'
    // gridGap: theme.spacing(3)
  },
  'SectionItem-root': {
    gridColumnEnd: 'span 6'
  }
}));
const classNames = [
  'LayoutHeader-root',
  'LayoutHeader-sectionTop',
  'LayoutHeader-sectionList',
  'LayoutContaienr-root',
  'LayoutContaienr-body',
  'LayoutContaienrTop-sectionList',
  'LayoutContaienrBottom-sectionList',
  'LayoutContaienrTop-sectionList-inner',
  'LayoutContaienrBottom-sectionList-inner',
  'LayoutFooter-root',
  'LayoutFooter-sectionList',
  'LayoutFooter-sectionBottom'
];

const sectionConfigInLayout = mergeSectionConfig({
  component: { sectionComponent: 'div' } // section とは、と思わなくはない。
});

type Props = {
  children?: ReactNode;
  title?: string;
  headerSections?: Section[];
  topSections?: Section[];
  bottomSections?: Section[];
  footerSections?: Section[];
  home?: boolean;
  classes?: { [key: string]: string };
};

const Layout = ({
  children,
  title = '',
  headerSections = [],
  topSections = [],
  bottomSections = [],
  footerSections = [],
  classes: inClasses
}: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  const classesHeaderFooter = useStylesGrid({
    classes: pruneClasses(inClasses, classNames)
  });
  const classesHeader = useStylesHeader({
    classes: pruneClasses(inClasses, classNames)
  });
  const { siteTitle } = useContext(siteContext).labels;
  const headerSectionsLen = headerSections.length;
  const footerSectionsLen = footerSections.length;
  const maxWidth = 'sm';
  return (
    <>
      <Head>
        <title>{`${title}: ${siteTitle}`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className={classes['LayoutHeader-root']}>
        <Container maxWidth={maxWidth} disableGutters>
          <Box className={classes['LayoutHeader-sectionTop']}>
            <SectionList
              sections={[
                {
                  title: '',
                  content: [
                    { kind: 'partsSiteLogo', size: 'small', link: '/' },
                    { kind: 'partsSiteTitle', link: '/' }
                  ]
                },
                {
                  title: '',
                  content: [{ kind: 'partsNavMain' }]
                }
              ]}
              config={sectionConfigInLayout}
              classes={{ ...classesHeader }}
            />
          </Box>
          <Box className={classes['LayoutHeader-sectionTop']}>
            <SectionList
              sections={headerSections.slice(0, 1)}
              config={sectionConfigInLayout}
              classes={{ ...classes }}
            />
          </Box>
          {headerSectionsLen > 0 && (
            <Box className={classes['LayoutHeader-sectionList']}>
              <SectionList
                sections={headerSections.slice(1)}
                config={sectionConfigInLayout}
                classes={{ ...classesHeaderFooter }}
              />
            </Box>
          )}
        </Container>
      </header>
      <Box className={classes['LayoutContaienr-root']}>
        <Box className={classes['LayoutContaienrTop-sectionList']}>
          <Box className={classes['LayoutContaienrTop-sectionList-inner']}>
            <SectionList
              sections={topSections}
              config={sectionConfigInLayout}
              classes={{ ...classes }}
            />
          </Box>
        </Box>
        <Container className={classes['LayoutContaienr-body']} disableGutters>
          <>{children}</>
        </Container>
        <Box className={classes['LayoutContaienrBottom-sectionList']}>
          <Box className={classes['LayoutContaienrBottom-sectionList-inner']}>
            <SectionList
              sections={bottomSections}
              config={sectionConfigInLayout}
              classes={{ ...classes }}
            />
          </Box>
        </Box>
      </Box>
      <footer className={classes['LayoutHeader-root']}>
        <Container maxWidth={maxWidth} disableGutters>
          {footerSectionsLen > 0 && (
            <Box className={classes['LayoutFooter-sectionList']}>
              <SectionList
                sections={footerSections.slice(0, footerSectionsLen - 1)}
                config={sectionConfigInLayout}
                classes={{ ...classesHeaderFooter }}
              />
            </Box>
          )}
          <Box className={classes['LayoutFooter-sectionBottom']}>
            <SectionList
              sections={footerSections.slice(-1)}
              config={sectionConfigInLayout}
              classes={{ ...classes }}
            />
          </Box>
        </Container>
      </footer>
    </>
  );
};

export default Layout;
