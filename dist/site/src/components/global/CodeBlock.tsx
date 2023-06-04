'use client';

import Highlight from 'react-highlight';

export default function CodeBlock({
  code,
  lang,
}: {
  code: string;
  lang?: string;
}) {
  return (
    <>
      <div className="relative overflow-hidden rounded-lg">
        <Highlight
          className={`max-h-96 overflow-x-auto overflow-y-auto text-sm leading-5 ${
            lang ?? 'json'
          }`}
        >
          {code}
        </Highlight>
      </div>
    </>
  );
}
