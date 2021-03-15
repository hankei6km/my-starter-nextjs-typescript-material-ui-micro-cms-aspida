const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD
} = require('next/constants');

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);

  const env = {
    USE_MOCK_CLIENT: (() => {
      //  $USE_MOCK_CLIENT_FORCE を定義すると強制的に mock client を使う .
      if (isDev && process.env.DISABLE_MOCK_CLIENT !== 'true') return 'true';
      return '';
    })()
  };

  // https://docs.github.com/ja/actions/reference/environment-variables
  const assetPrefix = process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split('/', 2)[1]}`
    : '';

  console.log(`assetPrefix:${assetPrefix}`);

  // next.config.js object
  return {
    assetPrefix,
    env
  };
};
