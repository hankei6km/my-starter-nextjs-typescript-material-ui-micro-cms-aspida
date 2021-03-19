import { join } from 'path';
import { createHash } from 'crypto';
import { PageDataGetOptions, getSortedPagesData } from './pages';
import { processorMarkdownToHtml } from './markdown';
import { ApiNameArticleValues, ApiNameArticle } from './client';
import { PagesContent, PagesSectionKind } from '../types/client/contentTypes';
import { Section, ContentToc } from '../types/pageTypes';
import { GetQuery } from '../types/client/queryTypes';
import { imageToHtml, imageInfo } from './image';
import {
  getTocLabel,
  processorHtml,
  htmlToChildren,
  normalizedHtml,
  adjustHeading,
  htmlContent,
  htmlFromSection
} from './html';

// copy で使いまわす予定だったが、linter で "Added in: v13.1.0" にひっかかるようなのでやめる.
// const hash = createHash('sha256');
const hashAbbrev = 9; // 9 にとくに意味はない

export function getNotificationId(
  notificationId: string,
  title: string,
  messageHtml: string
): string {
  if (notificationId) {
    return notificationId;
  }
  return createHash('sha256')
    .update(`${title}:${messageHtml}`, 'utf8')
    .digest('hex')
    .slice(0, hashAbbrev);
}

export function getApiNameArticle(
  apiNameFromContent: string
): '' | ApiNameArticle {
  if (ApiNameArticleValues.some((v) => v === apiNameFromContent)) {
    return apiNameFromContent as ApiNameArticle;
  }
  return '';
}

export function getPagePostsTotalCountFromSection(sections: Section[]): number {
  let totalCount = -1;
  sections.findIndex(
    (section) =>
      section.content.findIndex((content) => {
        if (content.kind === 'posts' && content.postsKind === 'page') {
          totalCount = content.totalCount;
          return true;
        }
        return false;
      }) >= 0
  );
  return totalCount;
}

export function getTocFromSections(sections: Section[]): ContentToc {
  const ret: ContentToc = {
    label: 'toc',
    items: []
  };
  sections.forEach((section) => {
    ret.items = ret.items.concat(
      htmlContent(
        htmlFromSection(section), // ちょっともったいない. 分割されてない html 持ち越せないか.
        section.title
          ? [
              {
                depth: 0,
                label: section.title,
                items: [],
                id: getTocLabel(section.title)
              }
            ]
          : []
      )
    );
  });
  return ret;
}

export function purgeContentBlank(sections: Section[]): Section[] {
  const contentPurged = sections.map((section) => {
    const content = section.content.filter(({ kind }) => kind !== '');
    return { ...section, content };
  });
  return contentPurged.filter(({ content }) => content.length > 0);
}

export async function getSectionFromPages(
  page: PagesContent,
  kind: PagesSectionKind,
  { articlesApi, curCategory, itemsPerPage, pageNo }: PageDataGetOptions = {
    outerIds: [],
    pageNo: 1,
    itemsPerPage: 10
  }
): Promise<Section[]> {
  const sections = page.sections
    .filter(({ fieldId }) => fieldId === kind)
    .map((section) => ({
      title: section.title || '',
      persist: section.persist !== undefined ? section.persist : false,
      content: section.content.map((content) => {
        return async () => {
          if (content.fieldId === 'contentHtml') {
            return {
              kind: 'html' as const,
              contentHtml: htmlToChildren(
                normalizedHtml(
                  processorHtml().use(adjustHeading, {
                    top: section.title ? 4 : 3
                  }),
                  content.html
                )
              )
            };
          } else if (content.fieldId === 'contentMarkdown') {
            return {
              kind: 'html' as const,
              contentHtml: htmlToChildren(
                normalizedHtml(
                  processorMarkdownToHtml().use(adjustHeading, {
                    top: section.title ? 4 : 3
                  }),
                  content.markdown
                )
              )
            };
          } else if (content.fieldId === 'contentImage') {
            return {
              kind: 'html' as const,
              // contentHtml: htmlToChildren(imageToHtml({ ...content }))
              contentHtml: htmlToChildren(
                imageToHtml({
                  image: await imageInfo(content.image.url),
                  alt: content.alt,
                  asThumb: true
                })
              )
            };
          } else if (content.fieldId === 'contentPageArticles' && articlesApi) {
            const apiName = articlesApi;
            const q: GetQuery = {};
            if (itemsPerPage !== undefined) {
              q.limit = itemsPerPage;
              if (pageNo !== undefined) {
                q.offset = itemsPerPage * (pageNo - 1);
              }
            }
            if (curCategory) {
              q.filters = `category[contains]${curCategory}`;
            }
            const pagesList = await getSortedPagesData(apiName, q);
            return {
              kind: 'posts' as const,
              postsKind: 'page' as const,
              contents: pagesList.contents.map((c) => ({
                ...c,
                // path: normalize(`/${content.apiName}`)
                path: join('/', apiName)
              })),
              totalCount: pagesList.totalCount,
              detail: content.detail || false
            };
          } else if (
            content.fieldId === 'contentFragArticles' &&
            getApiNameArticle(content.apiName)
          ) {
            const apiName = getApiNameArticle(
              content.apiName
            ) as ApiNameArticle;
            // if での評価と２回実行される.
            // 型ガードが効かない & ちょっともったいないが、
            // 外に出すと関係のないカスタムフィールドでも実行されるので、とりあえずここで
            const q: GetQuery = {};
            if (content.limit !== undefined) {
              q.limit = content.limit;
            }
            if (content.category.length > 0) {
              q.filters = `category[contains]${content.category
                .map(({ id }) => id)
                .join(',')}`;
            }
            const pagesList = await getSortedPagesData(apiName, q);
            return {
              kind: 'posts' as const,
              postsKind: 'fragment' as const,
              contents: pagesList.contents.map((c) => ({
                ...c,
                // path: normalize(`/${content.apiName}`)
                path: join('/', apiName)
              })),
              totalCount: pagesList.totalCount,
              detail: content.detail || false
            };
          } else if (
            content.fieldId === 'contentNotification' &&
            content.enabled
          ) {
            const messageHtml = normalizedHtml(
              processorHtml(),
              content.messageHtml
            ); // 個別に sanitizeHtml を実行していると抜けが出そう
            return {
              kind: 'notification' as const,
              title: content.title || '',
              messageHtml: messageHtml,
              severity: content.severity[0],
              autoHide: content.autoHide || false,
              notificationId: getNotificationId(
                content.notificationId || '',
                content.title || '',
                messageHtml
              )
            };
            // return {
            //   kind: 'message' as const,
            //   contentHtml: htmlToChildren(stickyBarToHtml({ ...content }))
            // };
          }
          return {
            kind: '' as const
          };
        };
      })
    }));
  // all だと fetch が同時に実行されすぎる?
  // (いっても 2 セクションもないだろうけど)
  return purgeContentBlank(
    await Promise.all(
      sections.map(async (section) => {
        return {
          title: section.title,
          id: getTocLabel(section.title || ''),
          persist: section.persist,
          // content: []
          content: await Promise.all(
            section.content.map((content) => content())
          )
        };
      })
    )
  );
}
