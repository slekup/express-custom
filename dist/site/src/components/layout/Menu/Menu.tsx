import React from 'react';

import { RoutesData } from 'src/typings/core';
import MenuSection from './MenuSection';

interface Props {
  data: RoutesData;
}

const Menu = ({ data }: Props) => {
  return (
    <>
      <div className="relative min-w-60 max-w-60"></div>

      <div className="fixed top-14 left-0 bottom-0 border-r border-border min-w-60 max-w-60 bg-shade p-3 py-5">
        <MenuSection
          data={{
            name: 'Primary',
            routes: [],
          }}
        />
        <MenuSection data={data} />
      </div>
    </>
  );
};

export default Menu;
