import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ArticleList from './ArticleList';
import { Section as SectionType } from '../types/pageTypes';
import { pruneClasses } from '../utils/classes';
import SectionContext from './SectionContext';
import HtmlFragment from './content/HtmlFragment';
import SiteTitle from './parts/SiteTitle';
import SiteLogo from './parts/SiteLogo';
import PageTitle from './parts/PageTitle';
import ProfileImage from './parts/ProfileImage';
import NavMain from './parts/NavMain';
import DateUpdated from './parts/DateUpdated';
import NavCategory from './parts/NavCategory';
import NavPagination from './parts/NavPagination';
import NavContentToc from './parts/NavContentToc';
import NavBreadcrumbs from './parts/NavBreadcrumbs';
import Notification from './content/Notification';

const useStyles = makeStyles(() => ({
  'SectionContent-root': {},
  'SectionContent-contentBody': {},
  'SectionContent-contentArticles': {}
}));
const classNames = [
  'SectionContent-root',
  'SectionContent-contentBody',
  'SectionContent-contentArticles'
];

type Props = {
  content: SectionType['content'][0];
  classes?: { [key: string]: string };
};

const SectionContent = ({ content, classes: inClasses }: Props) => {
  const classes = useStyles({ classes: pruneClasses(inClasses, classNames) });
  const { naked } = useContext(SectionContext);
  // if (content.kind === 'partsNavPagination') {
  //   console.log(content.href);
  // }
  const contentNode = (
    <>
      {content.kind === 'html' && (
        <HtmlFragment htmlChildren={content.contentHtml} />
      )}
      {content.kind === 'partsSiteTitle' && (
        <SiteTitle link={content.link} classes={{ ...inClasses }} />
      )}
      {content.kind === 'partsSiteLogo' && (
        <SiteLogo
          size={content.size}
          link={content.link}
          classes={{ ...inClasses }}
        />
      )}
      {content.kind === 'partsPageTitle' && (
        <PageTitle link={content.link} classes={{ ...inClasses }} />
      )}
      {content.kind === 'partsProfileImage' && (
        <ProfileImage
          size={content.size}
          name={content.name}
          link={content.link}
          classes={{ ...inClasses }}
        />
      )}
      {content.kind === 'partsUpdated' && (
        <DateUpdated classes={{ ...inClasses }} />
      )}
      {content.kind === 'partsNavMain' && (
        <NavMain classes={{ ...inClasses }} />
      )}
      {content.kind === 'partsNavBreadcrumbs' && (
        <NavBreadcrumbs
          lastBreadcrumb={content.lastBreadcrumb}
          classes={{ ...inClasses }}
        />
      )}
      {content.kind === 'partsNavCategory' && (
        <NavCategory
          all={content.all}
          categoryPath={content.categoryPath}
          classes={{ ...inClasses }}
        />
      )}
      {content.kind === 'partsNavPagination' && (
        <NavPagination
          paginationHref={content.href}
          paginationBaseAs={content.baseAs}
          paginationPagePath={content.pagePath}
          paginationFirstPageHref={content.firstPageHref}
          classes={{ ...inClasses }}
        />
      )}
      {content.kind === 'partsNavContentToc' && (
        <NavContentToc expanded={content.expanded} classes={{ ...inClasses }} />
      )}
      {content.kind === 'posts' && (
        <Box className={classes['SectionContent-contentArticles']}>
          <ArticleList
            items={content.contents}
            detail={content.detail}
            classes={{ ...inClasses }}
          />
        </Box>
      )}
      {content.kind === 'notification' && (
        <Notification
          title={content.title}
          messageHtml={content.messageHtml}
          serverity={content.severity}
          autoHide={content.autoHide}
          notificationId={content.notificationId}
          classes={{ ...inClasses }}
        />
      )}
    </>
  );
  if (naked) {
    return contentNode;
  }
  return <Box className={classes['SectionContent-root']}>{contentNode}</Box>;
};
export default SectionContent;
