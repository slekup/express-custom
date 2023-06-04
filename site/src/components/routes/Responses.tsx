'use client';

import React, { useState } from 'react';
import Highlight from 'react-highlight';
import { HiChevronDown } from 'react-icons/hi';

import { EndpointResponse } from '@typings/core';
import { CodeBlock } from '..';

interface Props {
  responses: EndpointResponse[];
  index: number;
}

export default function Responses({ responses, index }: Props) {
  const [showResponses, setShowResponses] = useState<number[]>([]);

  return (
    <div className="relative mt-5">
      <button
        className="text-text-primary bg-default hover:bg-default-hover active:bg-default-active flex rounded-md px-2 py-1 text-xs active:cursor-wait"
        onClick={() => {
          if (showResponses.some((responseIndex) => responseIndex === index))
            setShowResponses(
              showResponses.filter((responseIndex) => responseIndex !== index)
            );
          else setShowResponses([...showResponses, index]);
        }}
      >
        <span>Show Responses ({responses.length})</span>
        <HiChevronDown
          className={`ml-1 mt-0.5 h-4 w-4 transition duration-300 ${
            showResponses.includes(index) ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`origin-top transition-all duration-300 ${
          showResponses.includes(index)
            ? 'max-h-screen scale-y-100'
            : 'max-h-0 scale-y-0'
        }`}
      >
        {responses.map((response, responseIndex) => (
          <div className="mt-3" key={responseIndex}>
            <CodeBlock code={JSON.stringify(response, null, 2)} lang="json" />
          </div>
        ))}
      </div>
    </div>
  );
}
