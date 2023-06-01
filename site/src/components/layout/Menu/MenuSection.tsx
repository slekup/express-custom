import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

import { AiOutlineApi } from 'react-icons/ai';

import matches from '@contants/matches';

interface Props {
  data: {
    name: string;
    links: {
      title: string;
      url: string;
      sublinks: { title: string; slug: string }[];
    }[];
  };
}

export default function MenuSection({ data: apiData }: Props) {
  const pathname = usePathname();

  useEffect(() => {
    // Get all the links in the sidebar
    const menuLinks = document.querySelectorAll('.menu a');

    const handleScroll = () => {
      // Get the scroll position of the page
      // const scrollPosition = window.scrollY;
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
    };

    // Listen for scroll events on the window
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const btnStyle =
    'block w-full text-left py-2 px-2.5 cursor-pointer text-sm font-semibold rounded-md';

  const getIcon = (title: string): JSX.Element => {
    for (const [keys, Icon] of matches) {
      for (const key of keys) {
        if (title.toLowerCase().includes(key)) {
          return <Icon className="-mt-1 mr-2 inline-block h-5 w-5" />;
        }
      }
    }

    return <AiOutlineApi className="-mt-1 mr-2 inline-block h-5 w-5" />;
  };

  return (
    <>
      <p className="text-text-secondary mx-2.5 mb-1 mt-5 text-base font-bold uppercase">
        {apiData.name}
      </p>
      {apiData.links.map((link, index) =>
        link.url === pathname ? (
          <div className="" key={index}>
            <button
              className={`${btnStyle} bg-primary/10 text-primary`}
              key={index}
            >
              {getIcon(link.title)}
              {link.title}
            </button>
          </div>
        ) : (
          <div className="" key={index}>
            <Link
              key={index}
              href={`${link.url}`}
              className={`${btnStyle} text-text-secondary/90 hover:bg-default active:bg-default-hover hover:text-text-primary active:text-text`}
            >
              {getIcon(link.title)}
              {link.title}
            </Link>
          </div>
        )
      )}
    </>
  );
}
