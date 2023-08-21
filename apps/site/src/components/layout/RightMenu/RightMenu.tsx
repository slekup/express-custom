'use client';

import { useState } from 'react';

import { IApiData, Route } from '@typings/core';
import toSlug from '@utils/functions/toSlug';
import { usePathname } from 'next/navigation';
import { BiNavigation } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

interface Props {
  apiData: IApiData;
}

export default function RightMenu({ apiData }: Props) {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const pathname = usePathname();

  let route: Route | undefined;

  for (const version of apiData.versions) {
    for (const router of version.routers) {
      for (const currentRoute of router.routes) {
        if (
          `/docs/v${version.version}/${toSlug(router.name)}/${toSlug(
            currentRoute.name
          )}` === pathname
        ) {
          route = currentRoute;
          break;
        }
      }
    }
  }

  if (!route) return null;

  const openMenu = () => {
    if (window.innerWidth < 1024) {
      document.documentElement.style.overflowY = 'hidden';
      document.body.style.overflowY = 'hidden';
    }
    setMobileOpen(true);
  };

  const closeMenu = () => {
    document.documentElement.style.overflowY = 'auto';
    document.body.style.overflowY = 'auto';
    setMobileOpen(false);
  };

  const endpointMethodStyle = {
    GET: 'bg-blue-500/40',
    POST: 'bg-green-500/40',
    PATCH: 'bg-orange-500/40',
    PUT: 'bg-purple-500/40',
    DELETE: 'bg-red-500/40',
    OPTIONS: 'bg-cyan-500/40',
    HEAD: 'bg-gray-500/40',
    TRACE: 'bg-gray-500/40',
    CONNECT: 'bg-gray-500/40',
  };

  const widthStyle = 'lg:min-w-80 lg:max-w-80';

  return (
    <>
      <div className={`relative ${widthStyle} hidden lg:block`}></div>

      <button
        className="border-border text-text-primary active:text-text bg-background hover:bg-default active:bg-default-active fixed right-2 top-16 z-50 rounded-3xl border p-2 lg:hidden"
        onClick={mobileOpen ? closeMenu : openMenu}
      >
        {mobileOpen ? (
          <MdClose className="h-5 w-5" />
        ) : (
          <BiNavigation className="h-5 w-5" />
        )}
      </button>

      <div
        className={`border-border hover-thin-scroll bg-background fixed bottom-0 left-0 right-0 top-14 z-40 w-full overflow-y-auto overflow-x-hidden border-l md:left-auto ${widthStyle} ${
          mobileOpen ? '' : 'invisible opacity-0 lg:visible lg:opacity-100'
        } transition-[visibility,opacity] duration-300`}
      >
        <div className="p-7 lg:p-5">
          <h1 className="text-text-primary text-2xl font-bold">{route.name}</h1>
          <p className="text-medium text-text-secondary mt-2 text-lg">
            {route.description}
          </p>
          <div className="no-select mt-5">
            {route.endpoints.map((endpoint, index) => (
              <a
                key={index}
                href={`#${toSlug(endpoint.name)}`}
                className={`text-text-secondary hover:text-text block w-full py-1 text-sm hover:underline`}
                onClick={() => (window.innerWidth < 1024 ? closeMenu() : null)}
              >
                <div
                  className={`${
                    endpointMethodStyle[endpoint.method]
                  } mr-2 inline-block h-2 w-2 rounded-xl`}
                ></div>
                {endpoint.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
