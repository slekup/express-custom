'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

interface Props {
  apiData: IApiData;
}

export default function Header({ apiData }: Props) {
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

  return (
    <>
      <div className="h-14 relative"></div>

      <div className="h-14 bg-header no-select z-50 fixed top-0 left-0 right-0 border-header-border border-b text-header-text">
        <div className="flex justify-start">
          <div className="min-w-72 max-w-72">
            <Link href="/" className="flex mx-4">
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

              <h1 className="font-bold text-2xl py-3.5 rounded-lg text-text-primary">
                {apiData.name}
              </h1>
            </Link>
          </div>

          <div className="flex">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className={`my-4 mr-5 font-medium ${
                  basePath === link.url ? 'text-primary' : 'text-text-faint'
                }`}
              >
                {link.title}
              </Link>
            ))}
          </div>

          <div className="ml-auto flex">
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
                      className={`text-white p-1.5 rounded-3xl my-3 h-8 w-8 mr-2 ${styles}`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })
              : null}

            <div className="py-3 pr-3">
              <Button size="sm" style="default">
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
