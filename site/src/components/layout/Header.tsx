'use client';

import Link from 'next/link';
import React from 'react';

import { ApiData } from '@typings/core';
import { Button } from '..';

interface Props {
  data: ApiData;
}

const Header = ({ data }: Props) => {
  return (
    <>
      <div className="h-14 relative"></div>

      <div className="h-14 bg-header/50 backdrop-blur-[5px] no-select z-50 fixed top-0 left-0 right-0 border-header-border/50 border-b text-header-text">
        <div className="flex justify-between">
          <div className="flex mx-3">
            <div className="h-7 w-7 rounded-3xl rounded-tl-md bg-primary shadow-inner my-3.5 mr-2"></div>
            <Link
              href="/"
              className="font-semibold text-2xl py-3.5 rounded-lg text-text"
            >
              API Documentation
            </Link>
          </div>

          <div className="p-1.5">
            <Button
              onClick={() => {
                alert('sfrjkh');
              }}
            >
              Export JSON
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
