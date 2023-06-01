'use client';

import { useState } from 'react';

import toSlug from '@utils/functions/toSlug';
import { IApiData } from 'src/typings/core';
import MenuSection from './MenuSection';

interface Props {
  apiData: IApiData;
  mobileOpen: boolean;
  closeMenu: () => void;
}

export default function Menu({ apiData, mobileOpen, closeMenu }: Props) {
  const size = 'min-w-72 max-w-72';

  return (
    <>
      <div className={`relative ${size} hidden lg:block`}></div>

      <div
        className={`z-60 fixed left-0 top-0 h-screen w-screen bg-black/60 backdrop-blur-sm transition-[visibility,opacity] duration-300 lg:hidden ${
          mobileOpen ? '' : 'invisible opacity-0'
        }`}
        onClick={() => closeMenu()}
      ></div>

      <div
        className={`no-select menu z-60 hover-thin-scroll bg-menu border-border fixed bottom-0 left-0 top-0 overflow-y-auto overflow-x-hidden border-r pb-20 lg:top-14 ${size} px-4 py-2 transition duration-300 lg:py-5 ${
          mobileOpen ? '' : '-translate-x-full lg:translate-x-0'
        }`}
      >
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
        />

        {apiData.custom ? (
          <MenuSection
            data={{
              name: 'Primary',
              links: [],
            }}
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
            />
          ) : null
        )}
      </div>
    </>
  );
}
