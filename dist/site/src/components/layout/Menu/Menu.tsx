import { IApiData } from 'src/typings/core';
import MenuSection from './MenuSection';

interface Props {
  data: IApiData;
}

export default function Menu({ data }: Props) {
  const size = 'min-w-72 max-w-72';
  return (
    <>
      <div className={`relative ${size}`}></div>

      <div
        className={`fixed no-select top-14 menu overflow-y-auto overflow-x-hidden hover-thin-scroll pb-20 left-0 bottom-0 border-r border-border ${size} bg-shade px-4 py-5`}
      >
        <MenuSection
          data={{
            router: {
              name: 'Primary',
              routes: [],
            },
          }}
        />
        <MenuSection data={data} />
      </div>
    </>
  );
}
