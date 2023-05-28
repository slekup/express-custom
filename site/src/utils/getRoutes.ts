import fs from 'fs/promises';
import path from 'path';

import { ApiData, Route } from 'src/typings/core';
import routeToSlug from './routeToSlug';

export default async function getData(): Promise<ApiData> {
  const file = await fs.readFile(path.join(process.cwd(), './routes.json'), {
    encoding: 'utf-8',
  });

  return JSON.parse(file) as ApiData;
}

export async function getRouteSlugs(): Promise<
  { title: string; slug: string }[]
> {
  const data = await getData();

  return data.router.routes.map((route) => ({
    title: route.name,
    slug: routeToSlug(route.name),
  }));
}

export async function getRoute(
  route: string
): Promise<{ data: ApiData; route: Route }> {
  const data = await getData();
  return {
    data,
    route: {
      category: data.router.name,
      ...data.router.routes.find((r) => routeToSlug(r.name) === route),
    } as Route,
  };
}
