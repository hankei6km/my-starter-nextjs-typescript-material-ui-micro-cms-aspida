import {
  ImageTemplate,
  imageMatcherLandscape,
  imageMatcherPortrait
} from '../lib/imageTemplate';
// サーバー側で使う設定.
// ブラウザでは使わない or 見せたくない項目(セキュリティ的にの他にサイズ的な等

type SiteServerSideConfig = {
  globalPageId: string;
  imageConfig: {
    contentImageClassName: string;
    template: ImageTemplate[];
  };
};
const siteServerSideConfig: SiteServerSideConfig = {
  globalPageId: '_global',
  imageConfig: {
    // siteConfig と重複している項目
    contentImageClassName: 'contentImage-img',
    template: [
      {
        matcher: imageMatcherLandscape(0),
        intermediate: {
          kind: 'picture',
          sources: [
            {
              kind: 'suorce',
              width: 500,
              breakPoint: 'auto',
              suggestMedia: '(min-width: 410px)',
              srcset: {
                kind: 'srcSet',
                descriptor: 'x',
                set: [
                  {
                    src: {
                      kind: 'src',
                      url: {
                        base:
                          'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg',
                        params: [
                          {
                            key64: 'dpr64',
                            value64: 'Mw'
                          },
                          {
                            key64: 'fit64',
                            value64: 'Y3JvcA'
                          },
                          {
                            key64: 'h64',
                            value64: 'MzAw'
                          },
                          {
                            key64: 'w64',
                            value64: 'NTAw'
                          }
                        ],
                        paramsStr: 'dpr64=Mw&fit64=Y3JvcA&h64=MzAw&w64=NTAw'
                      }
                    },
                    width: 1500,
                    height: 900,
                    density: '3'
                  },
                  {
                    src: {
                      kind: 'src',
                      url: {
                        base:
                          'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg',
                        params: [
                          {
                            key64: 'dpr64',
                            value64: 'Mg'
                          },
                          {
                            key64: 'fit64',
                            value64: 'Y3JvcA'
                          },
                          {
                            key64: 'h64',
                            value64: 'MzAw'
                          },
                          {
                            key64: 'w64',
                            value64: 'NTAw'
                          }
                        ],
                        paramsStr: 'dpr64=Mg&fit64=Y3JvcA&h64=MzAw&w64=NTAw'
                      }
                    },
                    width: 1000,
                    height: 600,
                    density: '2'
                  },
                  {
                    src: {
                      kind: 'src',
                      url: {
                        base:
                          'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg',
                        params: [
                          {
                            key64: 'dpr64',
                            value64: 'MQ'
                          },
                          {
                            key64: 'fit64',
                            value64: 'Y3JvcA'
                          },
                          {
                            key64: 'h64',
                            value64: 'MzAw'
                          },
                          {
                            key64: 'w64',
                            value64: 'NTAw'
                          }
                        ],
                        paramsStr: 'dpr64=MQ&fit64=Y3JvcA&h64=MzAw&w64=NTAw'
                      }
                    },
                    width: 500,
                    height: 300,
                    density: '1'
                  }
                ]
              }
            },
            {
              kind: 'suorce',
              width: 350,
              breakPoint: 'auto',
              suggestMedia: '(min-width: 330px)',
              srcset: {
                kind: 'srcSet',
                descriptor: 'x',
                set: [
                  {
                    src: {
                      kind: 'src',
                      url: {
                        base:
                          'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg',
                        params: [
                          {
                            key64: 'dpr64',
                            value64: 'Mw'
                          },
                          {
                            key64: 'fit64',
                            value64: 'Y3JvcA'
                          },
                          {
                            key64: 'h64',
                            value64: 'MjEw'
                          },
                          {
                            key64: 'w64',
                            value64: 'MzUw'
                          }
                        ],
                        paramsStr: 'dpr64=Mw&fit64=Y3JvcA&h64=MjEw&w64=MzUw'
                      }
                    },
                    width: 1050,
                    height: 630,
                    density: '3'
                  },
                  {
                    src: {
                      kind: 'src',
                      url: {
                        base:
                          'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg',
                        params: [
                          {
                            key64: 'dpr64',
                            value64: 'Mg'
                          },
                          {
                            key64: 'fit64',
                            value64: 'Y3JvcA'
                          },
                          {
                            key64: 'h64',
                            value64: 'MjEw'
                          },
                          {
                            key64: 'w64',
                            value64: 'MzUw'
                          }
                        ],
                        paramsStr: 'dpr64=Mg&fit64=Y3JvcA&h64=MjEw&w64=MzUw'
                      }
                    },
                    width: 700,
                    height: 420,
                    density: '2'
                  },
                  {
                    src: {
                      kind: 'src',
                      url: {
                        base:
                          'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg',
                        params: [
                          {
                            key64: 'dpr64',
                            value64: 'MQ'
                          },
                          {
                            key64: 'fit64',
                            value64: 'Y3JvcA'
                          },
                          {
                            key64: 'h64',
                            value64: 'MjEw'
                          },
                          {
                            key64: 'w64',
                            value64: 'MzUw'
                          }
                        ],
                        paramsStr: 'dpr64=MQ&fit64=Y3JvcA&h64=MjEw&w64=MzUw'
                      }
                    },
                    width: 350,
                    height: 210,
                    density: '1'
                  }
                ]
              }
            }
          ],
          img: {
            kind: 'img',
            alt: '',
            src: {
              kind: 'src',
              url: {
                base:
                  'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg',
                params: [
                  {
                    key64: 'fit64',
                    value64: 'Y3JvcA'
                  },
                  {
                    key64: 'h64',
                    value64: 'MzAw'
                  },
                  {
                    key64: 'w64',
                    value64: 'NTAw'
                  }
                ],
                paramsStr: 'fit64=Y3JvcA&h64=MzAw&w64=NTAw'
              }
            },
            width: 500,
            height: 300
          }
        },
        asThumb: true,
        largeImage: {
          matcher: imageMatcherLandscape(1500),
          paramsStr: 'w64=MTUwMA'
        },
        templateSrc: `{
          "imageBaseUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
          "baseParameterSet": [
            {}
          ],
          "baseMedias": [],
          "editTargetKey": "EDIT-TARGET-KEY",
          "defaultTargetKey": "DEFAULT-TARGET-KEY",
          "card": {
            "cardType": "summary_large_image",
            "title": "",
            "description": ""
          },
          "tagFragment": {
            "altText": "",
            "linkText": "",
            "asThumb": false,
            "newTab": false,
            "srcsetDescriptor": "auto",
            "disableWidthHeight": false
          },
          "previewSetState": "edited",
          "previewSetKind": "data",
          "previewSet": [
            {
              "itemKey": "ITEM-KEY-1",
              "previewUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?dpr64=Mw&fit64=Y3JvcA&h64=MzAw&w64=NTAw",
              "baseImageUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
              "imageParams": [
                {
                  "key": "dpr",
                  "value": "3"
                },
                {
                  "key": "fit",
                  "value": "crop"
                },
                {
                  "key": "h",
                  "value": "300"
                },
                {
                  "key": "w",
                  "value": "500"
                }
              ],
              "imgWidth": 1500,
              "imgHeight": 900,
              "imgDispDensity": 3,
              "media": "auto"
            },
            {
              "itemKey": "ITEM-KEY-2",
              "previewUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?dpr64=Mg&fit64=Y3JvcA&h64=MzAw&w64=NTAw",
              "baseImageUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
              "imageParams": [
                {
                  "key": "dpr",
                  "value": "2"
                },
                {
                  "key": "fit",
                  "value": "crop"
                },
                {
                  "key": "h",
                  "value": "300"
                },
                {
                  "key": "w",
                  "value": "500"
                }
              ],
              "imgWidth": 1000,
              "imgHeight": 600,
              "imgDispDensity": 2,
              "media": "auto"
            },
            {
              "itemKey": "ITEM-KEY-3",
              "previewUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?dpr64=MQ&fit64=Y3JvcA&h64=MzAw&w64=NTAw",
              "baseImageUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
              "imageParams": [
                {
                  "key": "dpr",
                  "value": "1"
                },
                {
                  "key": "fit",
                  "value": "crop"
                },
                {
                  "key": "h",
                  "value": "300"
                },
                {
                  "key": "w",
                  "value": "500"
                }
              ],
              "imgWidth": 500,
              "imgHeight": 300,
              "imgDispDensity": 1,
              "media": "auto"
            },
            {
              "itemKey": "DEFAULT-TARGET-KEY",
              "previewUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?fit64=Y3JvcA&h64=MzAw&w64=NTAw",
              "baseImageUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
              "imageParams": [
                {
                  "key": "fit",
                  "value": "crop"
                },
                {
                  "key": "h",
                  "value": "300"
                },
                {
                  "key": "w",
                  "value": "500"
                }
              ],
              "imgWidth": 500,
              "imgHeight": 300,
              "imgDispDensity": 1,
              "media": "auto"
            },
            {
              "itemKey": "EDIT-TARGET-KEY",
              "previewUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?dpr64=Mw&fit64=Y3JvcA&h64=MjEw&w64=MzUw",
              "baseImageUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
              "imageParams": [
                {
                  "key": "dpr",
                  "value": "3"
                },
                {
                  "key": "fit",
                  "value": "crop"
                },
                {
                  "key": "h",
                  "value": "210"
                },
                {
                  "key": "w",
                  "value": "350"
                }
              ],
              "imgWidth": 1050,
              "imgHeight": 630,
              "imgDispDensity": 3,
              "media": "auto"
            },
            {
              "itemKey": "ITEM-KEY-6",
              "previewUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?dpr64=Mg&fit64=Y3JvcA&h64=MjEw&w64=MzUw",
              "baseImageUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
              "imageParams": [
                {
                  "key": "dpr",
                  "value": "2"
                },
                {
                  "key": "fit",
                  "value": "crop"
                },
                {
                  "key": "h",
                  "value": "210"
                },
                {
                  "key": "w",
                  "value": "350"
                }
              ],
              "imgWidth": 700,
              "imgHeight": 420,
              "imgDispDensity": 2,
              "media": "auto"
            },
            {
              "itemKey": "ITEM-KEY-7",
              "previewUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?dpr64=MQ&fit64=Y3JvcA&h64=MjEw&w64=MzUw",
              "baseImageUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
              "imageParams": [
                {
                  "key": "dpr",
                  "value": "1"
                },
                {
                  "key": "fit",
                  "value": "crop"
                },
                {
                  "key": "h",
                  "value": "210"
                },
                {
                  "key": "w",
                  "value": "350"
                }
              ],
              "imgWidth": 350,
              "imgHeight": 210,
              "imgDispDensity": 1,
              "media": "auto"
            }
          ]
        }`
      },
      {
        matcher: imageMatcherPortrait(0),
        intermediate: {
          kind: 'picture',
          sources: [
            {
              kind: 'suorce',
              width: 300,
              breakPoint: 'auto',
              suggestMedia: '(min-width: 240px)',
              srcset: {
                kind: 'srcSet',
                descriptor: 'x',
                set: [
                  {
                    src: {
                      kind: 'src',
                      url: {
                        base:
                          'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg',
                        params: [
                          {
                            key64: 'dpr64',
                            value64: 'Mw'
                          },
                          {
                            key64: 'fit64',
                            value64: 'Y3JvcA'
                          },
                          {
                            key64: 'h64',
                            value64: 'NTAw'
                          },
                          {
                            key64: 'w64',
                            value64: 'MzAw'
                          }
                        ],
                        paramsStr: 'dpr64=Mw&fit64=Y3JvcA&h64=NTAw&w64=MzAw'
                      }
                    },
                    width: 900,
                    height: 1500,
                    density: '3'
                  },
                  {
                    src: {
                      kind: 'src',
                      url: {
                        base:
                          'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg',
                        params: [
                          {
                            key64: 'dpr64',
                            value64: 'Mg'
                          },
                          {
                            key64: 'fit64',
                            value64: 'Y3JvcA'
                          },
                          {
                            key64: 'h64',
                            value64: 'NTAw'
                          },
                          {
                            key64: 'w64',
                            value64: 'MzAw'
                          }
                        ],
                        paramsStr: 'dpr64=Mg&fit64=Y3JvcA&h64=NTAw&w64=MzAw'
                      }
                    },
                    width: 600,
                    height: 1000,
                    density: '2'
                  },
                  {
                    src: {
                      kind: 'src',
                      url: {
                        base:
                          'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg',
                        params: [
                          {
                            key64: 'dpr64',
                            value64: 'MQ'
                          },
                          {
                            key64: 'fit64',
                            value64: 'Y3JvcA'
                          },
                          {
                            key64: 'h64',
                            value64: 'NTAw'
                          },
                          {
                            key64: 'w64',
                            value64: 'MzAw'
                          }
                        ],
                        paramsStr: 'dpr64=MQ&fit64=Y3JvcA&h64=NTAw&w64=MzAw'
                      }
                    },
                    width: 300,
                    height: 500,
                    density: '1'
                  }
                ]
              }
            }
          ],
          img: {
            kind: 'img',
            alt: '',
            src: {
              kind: 'src',
              url: {
                base:
                  'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg',
                params: [
                  {
                    key64: 'fit64',
                    value64: 'Y3JvcA'
                  },
                  {
                    key64: 'h64',
                    value64: 'NTAw'
                  },
                  {
                    key64: 'w64',
                    value64: 'MzAw'
                  }
                ],
                paramsStr: 'fit64=Y3JvcA&h64=NTAw&w64=MzAw'
              }
            },
            width: 300,
            height: 500
          }
        },
        asThumb: true,
        largeImage: {
          matcher: imageMatcherPortrait(1500),
          paramsStr: 'h64=MTUwMA'
        },
        templateSrc: `{
          "imageBaseUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
          "baseParameterSet": [
            {}
          ],
          "baseMedias": [],
          "editTargetKey": "EDIT-TARGET-KEY",
          "defaultTargetKey": "DEFAULT-TARGET-KEY",
          "card": {
            "cardType": "summary_large_image",
            "title": "",
            "description": ""
          },
          "tagFragment": {
            "altText": "",
            "linkText": "",
            "asThumb": false,
            "newTab": false,
            "srcsetDescriptor": "auto",
            "disableWidthHeight": false
          },
          "previewSetState": "edited",
          "previewSetKind": "data",
          "previewSet": [
            {
              "itemKey": "ITEM-KEY-1",
              "previewUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?dpr64=Mw&fit64=Y3JvcA&h64=NTAw&w64=MzAw",
              "baseImageUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
              "imageParams": [
                {
                  "key": "dpr",
                  "value": "3"
                },
                {
                  "key": "fit",
                  "value": "crop"
                },
                {
                  "key": "h",
                  "value": "500"
                },
                {
                  "key": "w",
                  "value": "300"
                }
              ],
              "imgWidth": 900,
              "imgHeight": 1500,
              "imgDispDensity": 3,
              "media": "auto"
            },
            {
              "itemKey": "ITEM-KEY-2",
              "previewUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?dpr64=Mg&fit64=Y3JvcA&h64=NTAw&w64=MzAw",
              "baseImageUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
              "imageParams": [
                {
                  "key": "dpr",
                  "value": "2"
                },
                {
                  "key": "fit",
                  "value": "crop"
                },
                {
                  "key": "h",
                  "value": "500"
                },
                {
                  "key": "w",
                  "value": "300"
                }
              ],
              "imgWidth": 600,
              "imgHeight": 1000,
              "imgDispDensity": 2,
              "media": "auto"
            },
            {
              "itemKey": "ITEM-KEY-3",
              "previewUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?dpr64=MQ&fit64=Y3JvcA&h64=NTAw&w64=MzAw",
              "baseImageUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
              "imageParams": [
                {
                  "key": "dpr",
                  "value": "1"
                },
                {
                  "key": "fit",
                  "value": "crop"
                },
                {
                  "key": "h",
                  "value": "500"
                },
                {
                  "key": "w",
                  "value": "300"
                }
              ],
              "imgWidth": 300,
              "imgHeight": 500,
              "imgDispDensity": 1,
              "media": "auto"
            },
            {
              "itemKey": "DEFAULT-TARGET-KEY",
              "previewUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg?fit64=Y3JvcA&h64=NTAw&w64=MzAw",
              "baseImageUrl": "https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/re-plotter/media/2020-10-24-jog1.jpg",
              "imageParams": [
                {
                  "key": "fit",
                  "value": "crop"
                },
                {
                  "key": "h",
                  "value": "500"
                },
                {
                  "key": "w",
                  "value": "300"
                }
              ],
              "imgWidth": 300,
              "imgHeight": 500,
              "imgDispDensity": 1,
              "media": "auto"
            }
          ]
        }`
      }
    ]
  }
};
export default siteServerSideConfig;
