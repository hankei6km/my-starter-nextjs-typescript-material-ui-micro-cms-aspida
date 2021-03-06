// https://github.com/mui-org/material-ui/blob/8558ec2e55486561503f2f736f57f70eea48e044/examples/nextjs/pages/_app.js
import React from 'react';
import { AppProps } from 'next/app';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { SnackbarProvider } from 'notistack';
import SiteContext from '../components/SiteContext';
import siteConfig from '../src/site.config';
import SiteStateContext, {
  SiteStateDispatch,
  SiteStateReducer,
  siteStateInitialState
} from '../reducers/SiteState';

const useStyles = makeStyles((theme) => ({
  containerRoot: {
    width: theme.breakpoints.values.sm
  }
}));

export default function MyApp({ Component, pageProps }: AppProps) {
  const classes = useStyles();
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // React.createContext だと router から外れた場所からの get では
  // 共有されないもよう。
  // sessionStorage は?
  // https://ja.reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down
  const [state, dispatch] = React.useReducer(
    SiteStateReducer,
    siteStateInitialState,
    (init) => {
      const newState = { ...init };
      return newState;
    }
  );

  return (
    <React.Fragment>
      <Head>
        <title>{siteConfig.labels.siteTitle}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <SiteContext.Provider value={siteConfig}>
        <SiteStateDispatch.Provider value={dispatch}>
          <SiteStateContext.Provider value={state}>
            <ThemeProvider theme={theme}>
              <SnackbarProvider
                maxSnack={3}
                dense
                hideIconVariant
                classes={{ containerRoot: classes.containerRoot }}
              >
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...pageProps} />
              </SnackbarProvider>
            </ThemeProvider>
          </SiteStateContext.Provider>
        </SiteStateDispatch.Provider>
      </SiteContext.Provider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
};
