'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

import routeToSlug from '@utils/routeToSlug';
import { ApiData } from 'src/typings/core';

interface Props {
  data: ApiData;
}

const MenuSection = ({ data }: Props) => {
  const btnStyle =
    'block w-full text-left py-1.5 px-2.5 cursor-pointer hover:text-text active:text-text hover:bg-default-hover active:bg-default-active text-sm font-medium rounded-md';

  const pathname = usePathname();

  useEffect(() => {
    // Get all the links in the sidebar
    const menuLinks = document.querySelectorAll('.menu a');

    // Listen for scroll events on the window
    window.addEventListener('scroll', () => {
      // Get the scroll position of the page
      const scrollPosition = window.scrollY;
      const endpointHeaders = document.querySelectorAll('endpoint-header');

      console.log(endpointHeaders.length);

      // Loop through all the headings in the main content area
      for (const heading of Array.from(
        document.querySelectorAll('endpoint-header')
      )) {
        // If the heading is above the top of the viewport, continue to the next heading
        if (heading.getBoundingClientRect().top < 0) {
          continue;
        }

        // If the heading is below the bottom of the viewport, break out of the loop
        if (heading.getBoundingClientRect().bottom > window.innerHeight) {
          break;
        }

        // If we've made it this far, the current heading is visible in the viewport
        // Get the corresponding link in the sidebar
        const link = document.querySelector(`[data-hash="${heading.id}"]`);
        if (link) {
          // Remove the "active" class from all links
          for (const otherLink of Array.from(menuLinks)) {
            otherLink.classList.remove('active');
          }

          // Add the "active" class to the current link
          link.classList.add('active');
        }

        // Break out of the loop
        break;
      }
    });

    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <>
      <p className="text-xs uppercase text-text-primary mb-1 font-semibold">
        {data.router.name}
      </p>
      {data.router.routes.map((route, index) =>
        `/${routeToSlug(route.name)}` === pathname ? (
          <div className="">
            <button
              className={`${btnStyle} bg-default-hover text-text`}
              key={index}
            >
              {route.name}
            </button>
            <div className="mt-2">
              {route.endpoints.map((endpoint, endpointIndex) => (
                <Link
                  key={endpointIndex}
                  href={`${routeToSlug(route.name)}#${routeToSlug(
                    endpoint.name
                  )}`}
                  className={`block w-full mx-3 text-sm text-text-secondary hover:text-text hover:underline`}
                >
                  {endpoint.name}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="">
            <Link
              key={index}
              href={`${routeToSlug(route.name)}`}
              className={`${btnStyle} text-text-secondary`}
            >
              {route.name}
            </Link>
          </div>
        )
      )}
    </>
  );
};

export default MenuSection;
