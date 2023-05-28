import fs from 'fs/promises';
import path from 'path';

import { Route, RoutesData } from 'src/typings/core';
import routeToSlug from './routeToSlug';

export default async function getRoutes(): Promise<RoutesData> {
  const file = await fs.readFile(path.join(process.cwd(), './routes.json'), {
    encoding: 'utf-8',
  });

  return JSON.parse(file) as RoutesData;
}

export async function getRouteSlugs(): Promise<
  { title: string; slug: string }[]
> {
  const data = await getRoutes();

  return data.routes.map((route) => ({
    title: route.name,
    slug: routeToSlug(route.name),
  }));
}

export async function getRoute(route: string): Promise<Route> {
  const data = await getRoutes();
  return {
    category: data.name,
    ...data.routes.find((r) => routeToSlug(r.name) === route),
  } as Route;
}
