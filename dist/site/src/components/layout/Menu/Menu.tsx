'use client';

import toSlug from '@utils/functions/toSlug';
import Link from 'next/link';
import { IApiData } from 'src/typings/core';
import MenuSection from './MenuSection';

interface Props {
  apiData: IApiData;
  mobileOpen: boolean;
  closeMenu: () => void;
  links: { title: string; url: string; active: boolean }[];
}

export default function Menu({ apiData, mobileOpen, closeMenu, links }: Props) {
  const size = 'min-w-72 max-w-72';

  return (
    <>
      <div className={`relative ${size} hidden lg:block`}></div>

      <div
        className={`z-60 fixed left-0 top-0 h-screen w-screen bg-black/60 backdrop-blur-sm transition-[visibility,opacity] duration-300 lg:hidden ${
          mobileOpen ? '' : 'invisible opacity-0'
        }`}
        onClick={closeMenu}
      ></div>

      <div
        className={`no-select z-60 hover-thin-scroll bg-menu border-border fixed bottom-0 left-0 top-0 overflow-y-auto overflow-x-hidden border-r lg:top-14 ${size} transition duration-300 ${
          mobileOpen ? '' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="border-border flex h-12 w-full border-b-2 pl-3 lg:hidden">
          {links.map((link, index) => (
            <Link
              key={index}
              className={`mr-3 h-12 border-b-2 py-3 text-sm font-medium ${
                link.active
                  ? 'text-primary border-primary'
                  : 'text-text-faint border-transparent'
              }`}
              href={link.url}
              onClick={closeMenu}
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div className="px-4 py-2 pb-20 lg:py-5">
          <MenuSection
            data={{
              name: 'Welcome',
              links: [
                {
                  title: 'Home',
                  url: '/',
                  sublinks: [],
                },
              ],
            }}
            closeMenu={closeMenu}
          />

          {apiData.custom ? (
            <MenuSection
              data={{
                name: 'Primary',
                links: [],
              }}
              closeMenu={closeMenu}
            />
          ) : null}

          {apiData.versions[0].routers.map((router, index) =>
            router.routes.length > 0 ? (
              <MenuSection
                key={index}
                data={{
                  name: router.name,
                  links: router.routes.map((route) => ({
                    title: route.name,
                    url: `/docs/v${apiData.versions[0].version}/${toSlug(
                      router.name
                    )}/${toSlug(route.name)}`,
                    sublinks: route.endpoints.map((endpoint) => ({
                      title: endpoint.name,
                      slug: `#${toSlug(endpoint.name)}`,
                    })),
                  })),
                }}
                closeMenu={closeMenu}
              />
            ) : null
          )}
        </div>
      </div>
    </>
  );
}
