'use client';

import React, { useState } from 'react';
import Highlight from 'react-highlight';
import { HiChevronDown } from 'react-icons/hi';

import { EndpointResponse } from '@typings/core';

interface Props {
  responses: EndpointResponse[];
  index: number;
}

const Responses = ({ responses, index }: Props) => {
  const [showResponses, setShowResponses] = useState<number[]>([]);

  return (
    <div className="relative mt-5">
      <button
        className="text-xs text-text-primary py-1 px-2 rounded-md bg-default hover:bg-default-hover active:bg-default-active flex active:cursor-wait"
        onClick={() => {
          if (showResponses.some((i) => i === index))
            setShowResponses(showResponses.filter((i) => i !== index));
          else setShowResponses([...showResponses, index]);
        }}
      >
        <span>Show Responses ({responses.length})</span>
        <HiChevronDown
          className={`ml-1 mt-0.5 h-4 w-4 transition duration-300 ${
            showResponses.includes(index) && 'rotate-180'
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
          <div
            className="relative mt-3 overflow-hidden rounded-lg"
            key={responseIndex}
          >
            <Highlight className="json overflow-x-auto">
              {JSON.stringify(response, null, 2)}
            </Highlight>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Responses;
