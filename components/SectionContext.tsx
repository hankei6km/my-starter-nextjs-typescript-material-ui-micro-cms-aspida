import React from 'react';
import merge from 'deepmerge';
import { ArticleListComponent, ArticleListVariant } from './ArticleList';
import { SectionItemComponent, SectionItemVariant } from './SectionItem';
import { ArticleDetailComponent, ArticleDetailVariant } from './ArticleDetail';
import { ArticleItemComponent, ArticleItemVariant } from './ArticleItem';
import { SiteTitleComponent, SiteTitleVariant } from './parts/SiteTitle';
import { PageTitleComponent, PageTitleVariant } from './parts/PageTitle';
import siteConfig from '../src/site.config';

export type SectionConfig = {
  naked: boolean;
  component: SectionItemComponent &
    ArticleListComponent &
    ArticleDetailComponent &
    ArticleItemComponent &
    SiteTitleComponent &
    PageTitleComponent;
  variant: SectionItemVariant &
    ArticleListVariant &
    ArticleDetailVariant &
    ArticleItemVariant &
    SiteTitleVariant &
    PageTitleVariant;
};

export function defaultSectionConfig(config?: SectionConfig): SectionConfig {
  if (config) {
    return config;
  }
  return siteConfig.sectionConfig;
  // return {
  //   component: { ...siteConfig.sectionConfig.component },
  //   variant: { ...siteConfig.sectionConfig.variant }
  // };
}

export function mergeSectionConfig(config: any): SectionConfig {
  return merge(defaultSectionConfig(), config);
}

const SectionContext = React.createContext(siteConfig.sectionConfig);
export default SectionContext;
