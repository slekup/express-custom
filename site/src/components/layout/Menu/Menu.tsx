import toSlug from '@utils/functions/toSlug';
import { IApiData } from 'src/typings/core';
import MenuSection from './MenuSection';

interface Props {
  apiData: IApiData;
}

export default function Menu({ apiData }: Props) {
  const size = 'min-w-72 max-w-72';

  return (
    <>
      <div className={`relative ${size}`}></div>

      <div
        className={`fixed no-select top-14 menu overflow-y-auto overflow-x-hidden hover-thin-scroll pb-20 left-0 bottom-0 border-r bg-menu border-border ${size} px-4 py-5`}
      >
        <MenuSection
          data={{
            name: 'Welcome',
            links: [
              {
                title: 'Home',
                url: '/',
                sublinks: [],
              },
            ],
          }}
        />

        {apiData.custom ? (
          <MenuSection
            data={{
              name: 'Primary',
              links: [],
            }}
          />
        ) : null}

        {apiData.versions[0].routers.map((router, index) =>
          router.routes.length > 0 ? (
            <MenuSection
              key={index}
              data={{
                name: router.name,
                links: router.routes.map((route) => ({
                  title: route.name,
                  url: `/docs/v${apiData.versions[0].version}/${toSlug(
                    router.name
                  )}/${toSlug(route.name)}`,
                  sublinks: route.endpoints.map((endpoint) => ({
                    title: endpoint.name,
                    slug: `#${toSlug(endpoint.name)}`,
                  })),
                })),
              }}
            />
          ) : null
        )}
      </div>
    </>
  );
}
