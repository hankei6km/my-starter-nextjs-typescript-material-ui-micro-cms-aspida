import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// https://stackoverflow.com/questions/56547215/react-testing-library-why-is-tobeinthedocument-not-a-function
import '@testing-library/jest-dom';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { mockRouter } from '../../test/testUtils';
import siteConfig from '../../src/site.config';
import SiteContext from '../../components/SiteContext';
import PageContext from '../../components/PageContext';
import NavPagination from './NavPagination';
import { blankPageData } from '../../types/pageTypes';

describe('NavPagination', () => {
  const pageData = blankPageData();
  test('renders nav pagination', () => {
    const config = siteConfig;
    const router = mockRouter();
    const { getByRole, getByText } = render(
      <RouterContext.Provider value={router}>
        <SiteContext.Provider value={config}>
          <PageContext.Provider
            value={{
              ...pageData,
              pageNo: 7,
              pageCount: 10,
              curCategory: 'cat1'
            }}
          >
            <NavPagination
              paginationHref="/posts/category/[...id]"
              paginationBaseAs="/posts/category"
              paginationPagePath={['page']}
              paginationFirstPageHref={''}
            />
          </PageContext.Provider>
        </SiteContext.Provider>
      </RouterContext.Provider>
    );
    const rootNav = getByRole('navigation');
    expect(rootNav).toBeInTheDocument();
    const rootUl = getByRole('list');
    expect(rootUl).toBeInTheDocument();

    const btn1 = getByText(/^1$/);
    expect(btn1).toBeInTheDocument();
    expect(btn1.getAttribute('href')).toEqual('/posts/category/cat1');
    const btn10 = getByText(/^10$/);
    expect(btn10).toBeInTheDocument();
    expect(btn10.getAttribute('href')).toEqual('/posts/category/cat1/page/10');

    const btnSelected = getByText(/^7$/);
    expect(btnSelected).toBeInTheDocument();

    fireEvent.click(btn10);
    expect(router.push).toHaveBeenCalledWith(
      '/posts/category/[...id]',
      '/posts/category/cat1/page/10',
      {
        locale: undefined,
        shallow: undefined
      }
    );
  });
  test('renders nav pagination with href of first page', () => {
    const config = siteConfig;
    const router = mockRouter();
    const { getByRole, getByText } = render(
      <RouterContext.Provider value={router}>
        <SiteContext.Provider value={config}>
          <PageContext.Provider
            value={{
              ...pageData,
              pageNo: 7,
              pageCount: 10,
              curCategory: ''
            }}
          >
            <NavPagination
              paginationHref="/posts/page/[..id]"
              paginationBaseAs="/posts/page"
              paginationPagePath={[]}
              paginationFirstPageHref={'/posts'}
            />
          </PageContext.Provider>
        </SiteContext.Provider>
      </RouterContext.Provider>
    );
    const rootNav = getByRole('navigation');
    expect(rootNav).toBeInTheDocument();
    const rootUl = getByRole('list');
    expect(rootUl).toBeInTheDocument();

    const btn1 = getByText(/^1$/);
    expect(btn1).toBeInTheDocument();
    expect(btn1.getAttribute('href')).toEqual('/posts');
    const btn10 = getByText(/^10$/);
    expect(btn10).toBeInTheDocument();
    expect(btn10.getAttribute('href')).toEqual('/posts/page/10');

    const btnSelected = getByText(/^7$/);
    expect(btnSelected).toBeInTheDocument();

    fireEvent.click(btn1);
    expect(router.push).toHaveBeenCalledWith('/posts', '/posts', {
      locale: undefined,
      shallow: undefined
    });
  });
  test('renders nav pagination without curCategory', () => {
    const config = siteConfig;
    const router = mockRouter();
    const { getByRole, getByText } = render(
      <RouterContext.Provider value={router}>
        <SiteContext.Provider value={config}>
          <PageContext.Provider
            value={{
              ...pageData,
              pageNo: 7,
              pageCount: 10,
              curCategory: ''
            }}
          >
            <NavPagination
              paginationHref="/posts/category/[...id]"
              paginationBaseAs="/posts/category"
              paginationPagePath={['page']}
              paginationFirstPageHref={''}
            />
          </PageContext.Provider>
        </SiteContext.Provider>
      </RouterContext.Provider>
    );
    const rootNav = getByRole('navigation');
    expect(rootNav).toBeInTheDocument();
    const rootUl = getByRole('list');
    expect(rootUl).toBeInTheDocument();

    const btn1 = getByText(/^1$/);
    expect(btn1).toBeInTheDocument();
    expect(btn1.getAttribute('href')).toEqual('/posts/category');
    const btn10 = getByText(/^10$/);
    expect(btn10).toBeInTheDocument();
    expect(btn10.getAttribute('href')).toEqual('/posts/category/page/10');

    const btnSelected = getByText(/^7$/);
    expect(btnSelected).toBeInTheDocument();

    fireEvent.click(btn10);
    expect(router.push).toHaveBeenCalledWith(
      '/posts/category/[...id]',
      '/posts/category/page/10',
      {
        locale: undefined,
        shallow: undefined
      }
    );
  });
  test('renders no elements if pagCount===0 ', () => {
    const config = siteConfig;
    const router = mockRouter();
    const { queryByRole, queryByText } = render(
      <RouterContext.Provider value={router}>
        <SiteContext.Provider value={config}>
          <PageContext.Provider
            value={{
              ...pageData,
              pageNo: 0,
              pageCount: 0,
              curCategory: ''
            }}
          >
            <NavPagination
              paginationHref="/posts/category/[...id]"
              paginationBaseAs="/posts/category"
              paginationPagePath={['page']}
              paginationFirstPageHref={''}
            />
          </PageContext.Provider>
        </SiteContext.Provider>
      </RouterContext.Provider>
    );
    const rootNav = queryByRole('navigation');
    expect(rootNav).not.toBeInTheDocument();
    const btn1 = queryByText(/^1$/);
    expect(btn1).not.toBeInTheDocument();
  });
  test('renders no elements if pagCount==-1 ', () => {
    const config = siteConfig;
    const router = mockRouter();
    const { queryByRole, queryByText } = render(
      <RouterContext.Provider value={router}>
        <SiteContext.Provider value={config}>
          <PageContext.Provider
            value={{
              ...pageData,
              pageNo: 0,
              pageCount: -1,
              curCategory: ''
            }}
          >
            <NavPagination
              paginationHref="/posts/category/[...id]"
              paginationBaseAs="/posts/category"
              paginationPagePath={['page']}
              paginationFirstPageHref={''}
            />
          </PageContext.Provider>
        </SiteContext.Provider>
      </RouterContext.Provider>
    );
    const rootNav = queryByRole('navigation');
    expect(rootNav).not.toBeInTheDocument();
    const btn1 = queryByText(/^1$/);
    expect(btn1).not.toBeInTheDocument();
  });
});
