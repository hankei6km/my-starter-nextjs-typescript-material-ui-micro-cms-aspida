import { mockDataArticleList } from '../test/testMockData';
import { FetchMock } from 'jest-fetch-mock';
import {
  getSectionFromPages,
  getApiNameArticle,
  getPagePostsTotalCountFromSection,
  getTocFromSections,
  purgeContentBlank
} from './section';
import { PagesContent } from '../types/client/contentTypes';
import { Section } from '../types/pageTypes';

// https://github.com/jefflau/jest-fetch-mock/issues/83
const fetchMock = fetch as FetchMock;
beforeEach(() => {
  fetchMock.resetMocks();
});

describe('getApiNameArticle()', () => {
  it('should pass through passed apitName', () => {
    expect(getApiNameArticle('posts')).toEqual('posts');
  });
  it('should return blank when invalid api name passed', () => {
    expect(getApiNameArticle('testtest')).toEqual('');
    // expect(getApiNameArticle('%articles', 'post')).toEqual('posts');  // type guard
    // expect(getApiNameArticle(undefined, 'posts')).toEqual('');
  });
});

describe('getPagePostsTotalCountFromSection()', () => {
  it('should returns totalCount from sections', async () => {
    expect(
      getPagePostsTotalCountFromSection([
        {
          title: 'content section',
          id: '',
          persist: false,
          content: [
            {
              kind: 'html' as const,
              contentHtml: [
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'content'
                }
              ]
            },
            {
              kind: 'posts' as const,
              postsKind: 'page',
              contents: [],
              totalCount: 50,
              detail: false
            }
          ]
        }
      ])
    ).toEqual(50);
    expect(
      getPagePostsTotalCountFromSection([
        {
          title: 'content section',
          id: '',
          persist: false,
          content: [
            {
              kind: 'html' as const,
              contentHtml: [
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'content'
                }
              ]
            }
          ]
        },
        {
          title: 'content section',
          id: '',
          persist: false,
          content: [
            {
              kind: 'posts' as const,
              postsKind: 'page',
              contents: [],
              totalCount: 50,
              detail: false
            }
          ]
        }
      ])
    ).toEqual(50);
  });
  it('should returns -1 from sections', async () => {
    expect(
      getPagePostsTotalCountFromSection([
        {
          title: 'content section',
          id: '',
          persist: false,
          content: [
            {
              kind: 'html' as const,
              contentHtml: [
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'content'
                }
              ]
            }
          ]
        }
      ])
    ).toEqual(-1);
  });
});

describe('getTocFromSections()', () => {
  it('should returns toc from sections', () => {
    expect(
      getTocFromSections([
        {
          title: '',
          id: '',
          persist: false,
          content: [
            {
              kind: 'html' as const,
              contentHtml: [
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'content'
                }
              ]
            }
          ]
        },
        {
          title: 'one',
          id: '',
          persist: false,
          content: [
            {
              kind: 'html' as const,
              contentHtml: [
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'content one'
                }
              ]
            }
          ]
        },
        {
          title: 'two',
          id: '',
          persist: false,
          content: [
            {
              kind: 'html' as const,
              contentHtml: [
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'content two'
                },
                {
                  tagName: 'h4',
                  style: {},
                  attribs: { id: 'two-1' },
                  html: 'two-1'
                },
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'content two-1'
                }
              ]
            }
          ]
        },
        {
          title: 'three end',
          id: '',
          persist: false,
          content: [
            {
              kind: 'html' as const,
              contentHtml: [
                {
                  tagName: 'p',
                  style: {},
                  attribs: {},
                  html: 'content three'
                }
              ]
            }
          ]
        }
      ])
    ).toEqual({
      label: 'toc',
      items: [
        {
          label: 'one',
          items: [],
          depth: 0,
          id: 'one'
        },
        {
          label: 'two',
          items: [
            {
              label: 'two-1',
              items: [],
              depth: 1,
              id: 'two-1'
            }
          ],
          depth: 0,
          id: 'two'
        },
        { label: 'three end', items: [], depth: 0, id: 'three-end' }
      ]
    });
  });
});

describe('purgeContentBlank()', () => {
  const mockData: Section[] = [
    {
      title: 'content section1',
      content: [
        {
          kind: 'html',
          contentHtml: [
            {
              tagName: 'p',
              style: {},
              attribs: {},
              html: 'content1'
            }
          ]
        }
      ]
    },
    {
      title: 'content section2',
      content: [
        {
          kind: 'html',
          contentHtml: [
            {
              tagName: 'p',
              style: {},
              attribs: {},
              html: 'content2'
            }
          ]
        },
        {
          kind: 'html',
          contentHtml: [
            {
              tagName: 'p',
              style: {},
              attribs: {},
              html: 'content3'
            }
          ]
        }
      ]
    }
  ];
  it('path through sections array', () => {
    expect(purgeContentBlank(mockData)).toStrictEqual(mockData);
  });
  it('should purge content included blank', () => {
    const blankMock = [...mockData];
    blankMock[1].content = [...mockData[1].content];
    blankMock[1].content[0] = { kind: '' };
    const blankExp = [...mockData];
    blankExp[1].content = [...blankExp[1].content];
    blankExp[1].content = blankExp[1].content.slice(1);
    expect(purgeContentBlank(blankMock)).toStrictEqual(blankExp);
  });
  it('should purge section included no content', () => {
    const blankMock = [...mockData];
    blankMock[0].content = [...mockData[0].content];
    blankMock[0].content[0] = { kind: '' };
    const blankExp = mockData.slice(1);
    expect(purgeContentBlank(blankMock)).toStrictEqual(blankExp);
  });
});

describe('getSectionFromPages()', () => {
  const mockBase: PagesContent = {
    id: 'home',
    createdAt: '2020-12-27T04:04:30.107Z',
    updatedAt: '2020-12-27T04:04:30.107Z',
    publishedAt: '2020-12-27T04:04:30.107Z',
    revisedAt: '2020-12-27T04:04:30.107Z',
    title: 'Home',
    kind: ['page'],
    description: 'my starter home page',
    category: [],
    sections: []
  };
  it('should returns sections that filtered kind', async () => {
    const mockData: PagesContent = {
      ...mockBase,
      category: [],
      sections: [
        {
          fieldId: 'sectionContent',
          title: 'content section',
          content: [
            {
              fieldId: 'contentHtml',
              html: '<p>content</p>'
            }
          ]
        },
        {
          fieldId: 'sectionTop',
          title: 'top section',
          content: [
            {
              fieldId: 'contentHtml',
              html: '<p>top</p>'
            }
          ]
        },
        {
          fieldId: 'sectionBottom',
          title: 'bottom section',
          content: [
            {
              fieldId: 'contentHtml',
              html: '<p>bottom</p>'
            }
          ]
        },
        {
          fieldId: 'sectionHeader',
          title: 'header section',
          content: [
            {
              fieldId: 'contentHtml',
              html: '<p>header</p>'
            }
          ]
        },
        {
          fieldId: 'sectionFooter',
          title: 'footer section',
          content: [
            {
              fieldId: 'contentHtml',
              html: '<p>footer</p>'
            }
          ]
        }
      ]
    };
    expect(await getSectionFromPages(mockData, 'sectionContent')).toEqual([
      {
        title: 'content section',
        id: 'content-section',
        persist: false,
        content: [
          {
            kind: 'html',
            contentHtml: [
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html: 'content'
              }
            ]
          }
        ]
      }
    ]);
    expect(await getSectionFromPages(mockData, 'sectionTop')).toEqual([
      {
        title: 'top section',
        id: 'top-section',
        persist: false,
        content: [
          {
            kind: 'html',
            contentHtml: [
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html: 'top'
              }
            ]
          }
        ]
      }
    ]);
    expect(await getSectionFromPages(mockData, 'sectionBottom')).toEqual([
      {
        title: 'bottom section',
        id: 'bottom-section',
        persist: false,
        content: [
          {
            kind: 'html',
            contentHtml: [
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html: 'bottom'
              }
            ]
          }
        ]
      }
    ]);
    expect(await getSectionFromPages(mockData, 'sectionHeader')).toEqual([
      {
        title: 'header section',
        id: 'header-section',
        persist: false,
        content: [
          {
            kind: 'html',
            contentHtml: [
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html: 'header'
              }
            ]
          }
        ]
      }
    ]);
    expect(await getSectionFromPages(mockData, 'sectionFooter')).toEqual([
      {
        title: 'footer section',
        id: 'footer-section',
        persist: false,
        content: [
          {
            kind: 'html',
            contentHtml: [
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html: 'footer'
              }
            ]
          }
        ]
      }
    ]);
  });
  it('should returns content sections from markdown', async () => {
    const mockData: PagesContent = {
      ...mockBase,
      category: [],
      sections: [
        {
          fieldId: 'sectionContent',
          title: '',
          persist: false,
          content: [
            {
              fieldId: 'contentMarkdown',
              markdown: 'content'
            }
          ]
        }
      ]
    };
    expect(await getSectionFromPages(mockData, 'sectionContent')).toEqual([
      {
        title: '',
        id: '',
        persist: false,
        content: [
          {
            kind: 'html',
            contentHtml: [
              {
                tagName: 'p',
                style: {},
                attribs: {},
                html: 'content'
              }
            ]
          }
        ]
      }
    ]);
  });
  it('should returns posts sections', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        ...mockDataArticleList,
        contents: mockDataArticleList.contents.slice(0, 1)
      })
    );
    const mockData: PagesContent = {
      ...mockBase,
      category: [],
      sections: [
        {
          fieldId: 'sectionContent',
          title: '',
          persist: false,
          content: [
            {
              fieldId: 'contentFragArticles',
              apiName: 'posts',
              detail: true,
              category: []
            }
          ]
        }
      ]
    };
    const res = await getSectionFromPages(mockData, 'sectionContent');
    expect(res).toEqual([
      {
        title: '',
        id: '',
        persist: false,
        content: [
          {
            kind: 'posts',
            postsKind: 'fragment',
            contents: [
              {
                id: 'mmmmmmmmm',
                createdAt: '2021-01-13T05:12.157Z',
                updatedAt: '2021-01-13T05:12.157Z',
                publishedAt: '2021-01-13T05:12.157Z',
                revisedAt: '2021-01-13T05:12.157Z',
                title: 'title4',
                category: [{ id: 'cat3', title: 'category3' }],
                path: '/posts'
              }
            ],
            totalCount: 4,
            detail: true
          }
        ]
      }
    ]);
  });
  it('should returns sections included notification', async () => {
    const mockData: PagesContent = {
      ...mockBase,
      category: [],
      sections: [
        {
          fieldId: 'sectionHeader',
          title: '',
          persist: false,
          content: [
            {
              fieldId: 'contentNotification',
              messageHtml: 'test1',
              enabled: true,
              severity: ['info']
            },
            {
              fieldId: 'contentNotification',
              messageHtml: 'test2',
              severity: ['info']
            },
            {
              fieldId: 'contentNotification',
              messageHtml: 'test3',
              enabled: true,
              severity: ['info'],
              autoHide: true
            },
            {
              fieldId: 'contentNotification',
              messageHtml: 'test4',
              enabled: true,
              severity: ['info'],
              notificationId: 'abcdefg'
            },
            {
              fieldId: 'contentNotification',
              title: 'title5',
              messageHtml: 'test5',
              enabled: true,
              severity: ['info']
            }
          ]
        }
      ]
    };
    const res = await getSectionFromPages(mockData, 'sectionHeader');
    expect(res).toEqual([
      {
        title: '',
        id: '',
        persist: false,
        content: [
          {
            kind: 'notification',
            title: '',
            messageHtml: 'test1',
            severity: 'info',
            autoHide: false,
            //echo -n ":test1" | sha256sum | cut -c 1-9
            // 8e09c99e6
            notificationId: '8e09c99e6'
          },
          {
            kind: 'notification',
            title: '',
            messageHtml: 'test3',
            severity: 'info',
            autoHide: true,
            // echo -n ":test3" | sha256sum | cut -c 1-9
            // dd5eb4555
            notificationId: 'dd5eb4555'
          },
          {
            kind: 'notification',
            title: '',
            messageHtml: 'test4',
            severity: 'info',
            autoHide: false,
            notificationId: 'abcdefg'
          },
          {
            kind: 'notification',
            title: 'title5',
            messageHtml: 'test5',
            severity: 'info',
            autoHide: false,
            // echo -n "title5:test5" | sha256sum | cut -c 1-9
            // fdc62342c
            notificationId: 'fdc62342c'
          }
        ]
      }
    ]);
  });
});
