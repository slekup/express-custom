'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import routeToSlug from '@utils/routeToSlug';
import { RoutesData } from 'src/typings/core';

interface Props {
  data: RoutesData;
}

const MenuSection = ({ data }: Props) => {
  const btnStyle =
    'block w-full text-left py-1.5 px-2.5 cursor-pointer hover:text-text no-select active:text-text hover:bg-default-hover active:bg-default-active text-sm font-medium rounded-md';

  const pathname = usePathname();

  return (
    <>
      <p className="text-xs uppercase text-text-primary mb-1 font-semibold">
        {data.name}
      </p>
      {data.routes.map((route, index) =>
        `/${routeToSlug(route.name)}` === pathname ? (
          <button
            className={`${btnStyle} bg-default-hover text-text`}
            key={index}
          >
            {route.name}
          </button>
        ) : (
          <Link
            key={index}
            href={`${routeToSlug(route.name)}`}
            className={`${btnStyle} text-text-secondary`}
          >
            {route.name}
          </Link>
        )
      )}
    </>
  );
};

export default MenuSection;
