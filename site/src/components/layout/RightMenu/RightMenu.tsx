'use client';

import { IApiData, Route } from '@typings/core';
import toSlug from '@utils/functions/toSlug';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  apiData: IApiData;
}

export default function RightMenu({ apiData }: Props) {
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

  const widthStyle = 'min-w-80 max-w-80';

  return (
    <>
      <div className={`relative ${widthStyle}`}></div>

      <div
        className={`fixed top-14 bottom-0 right-0 border-l overflow-x-hidden overflow-y-auto border-border hover-thin-scroll ${widthStyle}`}
      >
        <div className="p-5">
          <h1 className="font-bold text-text-primary text-2xl">{route.name}</h1>
          <p className="text-lg text-medium text-text-secondary mt-2">
            {route.description}
          </p>
          <div className="mt-5 no-select">
            {route.endpoints.map((endpoint, index) => (
              <a
                key={index}
                href={`#${toSlug(endpoint.name)}`}
                className={`block w-full py-1 text-sm text-text-secondary hover:text-text hover:underline`}
              >
                <div
                  className={`${
                    endpointMethodStyle[endpoint.method]
                  } h-2 w-2 rounded-xl inline-block mr-2`}
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
