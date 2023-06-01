'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

import { IApiData } from '@typings/core';
import { IconType } from 'react-icons/lib';
import { MdEmail } from 'react-icons/md';
import { RiInstagramFill } from 'react-icons/ri';
import { Button } from '..';
import Menu from './Menu/Menu';

interface Props {
  apiData: IApiData;
}

export default function Header({ apiData }: Props) {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const urlSplit = pathname.split('/');
  const pages = urlSplit.slice(1);
  const basePath = `/${pages[0]}`;

  const links = [
    {
      title: 'Home',
      url: '/',
    },
    {
      title: 'Documentation',
      url: '/docs',
    },
    {
      title: 'Structures',
      url: '/structures',
    },
  ];

  const openMenu = () => {
    document.documentElement.style.overflowY = 'none';
    document.body.style.overflowY = 'none';
    setMobileOpen(true);
  };

  const closeMenu = () => {
    document.documentElement.style.overflowY = 'auto';
    document.body.style.overflowY = 'auto';
    setMobileOpen(false);
  };

  return (
    <>
      <Menu apiData={apiData} mobileOpen={mobileOpen} closeMenu={closeMenu} />

      <div className="bg-header no-select border-header-border text-header-text fixed left-0 right-0 top-0 z-50 h-14 border-b">
        <div className="flex justify-start">
          <button className="" onClick={() => openMenu()}>
            Menu
          </button>

          <div className="lg:min-w-72 lg:max-w-72">
            <Link href="/" className="mx-4 flex">
              <div className="my-2 mr-3 h-9 w-9">
                {apiData.logo ? (
                  <Image
                    src={apiData.logo}
                    alt="API Logo"
                    height={100}
                    width={100}
                  />
                ) : (
                  <Image
                    src="/logo.png"
                    alt="API Logo"
                    height={100}
                    width={100}
                  />
                )}
              </div>

              <h1 className="text-text-primary rounded-lg py-3.5 text-2xl font-bold">
                {apiData.name}
              </h1>
            </Link>
          </div>

          <div className="flex">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className={`my-4 font-medium ${
                  basePath === link.url ? 'text-primary' : 'text-text-faint'
                }`}
              >
                {link.title}
              </Link>
            ))}
          </div>

          <div className="ml-auto mr-1.5 flex">
            {apiData.socials
              ? (
                  [
                    [
                      'discord',
                      FaDiscord,
                      'bg-[#5562EA] hover:bg-[#6B76F8] active:bg-[#8992FA]',
                    ],
                    [
                      'github',
                      FaGithub,
                      'bg-[#24292e] hover:bg-[#4A545E] active:bg-[#687684]',
                    ],
                    [
                      'instagram',
                      RiInstagramFill,
                      'bg-[#e1306c] hover:bg-[#c13584] active:bg-[#a9336d]',
                    ],
                    [
                      'facebook',
                      FaFacebook,
                      'bg-[#4467AB] hover:bg-[#6183C0] active:bg-[#7C98CB]',
                    ],
                    [
                      'linkedin',
                      FaLinkedin,
                      'bg-[#0D76AE] hover:bg-[#1092D8] active:bg-[#45B5F1]',
                    ],
                    [
                      'youtube',
                      FaYoutube,
                      'bg-[#FF0000] hover:bg-[#D20000] active:bg-[#B70000]',
                    ],
                    [
                      'twitter',
                      FaTwitter,
                      'bg-[#24AAD5] hover:bg-[#57C0E3] active:bg-[#7ACDE9]',
                    ],
                    [
                      'email',
                      MdEmail,
                      'bg-text-faint hover:bg-text-secondary active:bg-text-primary',
                    ],
                  ] as [string, IconType, string][]
                ).map(([key, Icon, styles], index) => {
                  if (!apiData.socials) return null;
                  const social = apiData.socials[key];
                  if (!social) return null;

                  return (
                    <a
                      href={social}
                      target="_blank"
                      key={index}
                      className={`my-3 mr-1.5 h-8 w-8 rounded-3xl p-1.5 text-white ${styles}`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })
              : null}

            {/* <div className="py-3">
              <Button size="sm" style="default">
                GitHub
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
