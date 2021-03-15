import { NextApiRequest, NextApiResponse } from 'next';
import { previewSetupHandler } from '../../../lib/preview';
import siteServerSideConfig from '../../../src/site.server-side-config';
import { getAllPagesIds } from '../../../lib/pages';

// apiName によって、どの API のプレビューか決定する..
// apiName で動的に扱うにはリダイレクト先をどこかで決める必要がある。
// と、思ったのだが、やはり分ける?

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) => {
  let location = '';
  switch (req.query.apiName) {
    case 'pages':
      // pages では slug は実質的には使わない(問題出るか?)
      // slug が指す id が含まれる location へリダイレクトさせる
      switch (id) {
        case siteServerSideConfig.globalPageId:
          // どこにリダイレクトしても表示はされる
          location = `/`;
          break;
        case 'home':
          location = `/`;
          break;
        case 'blog':
          location = `/posts/`;
          break;
        case 'blog-posts':
          // posts の [id] の outer.
          // id を１件取得して表示させる.
          // getAllPagesIds は aspida の client 使ってるので、おそらく mock もついてくる
          // (なので api route では使いたくなかったのだが)
          const ids = await getAllPagesIds('posts', { limit: 1 });
          if (ids.length > 0) {
            location = `/posts/${ids[0]}`;
          }
          break;
        case 'blog-category':
          location = `/posts/`;
          break;
      }
      break;
    case 'posts':
      location = `/${req.query.apiName}/${id}`;
      break;
  }
  if (location) {
    res.writeHead(307, { Location: location });
    return res.end('Preview mode enabled');
  }

  return res.status(404).end();
};

export default previewSetupHandler(handler);
