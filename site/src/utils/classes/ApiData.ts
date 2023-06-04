import fs from 'fs/promises';
import path from 'path';

import { IApiData, Route } from '@typings/core';
import routeToSlug from '@utils/functions/routeToSlug';
import toSlug from '@utils/functions/toSlug';

export default class ApiData {
  public data?: IApiData;

  public constructor() {
    this.data = undefined;
  }

  /**
   * Fetch the API data.
   * @returns The API data.
   */
  public async fetch(): Promise<IApiData> {
    if (this.data) return this.data;

    const file = await fs.readFile(path.join(process.cwd(), './api.json'), {
      encoding: 'utf-8',
    });

    this.data = JSON.parse(file) as IApiData;

    return this.data;
  }

  public getParams(): { version: string; router: string; route: string }[] {
    if (!this.data) throw new Error('Data not fetched');

    return this.data.versions.flatMap((version) =>
      version.routers.flatMap((router) =>
        router.routes.map((route) => ({
          version: version.version.toString(),
          router: router.name,
          route: toSlug(route.name),
        }))
      )
    );
  }

  /**
   * Get the data for a specific route.
   * @param route The route to get the data for.
   * @returns The route data.
   */
  public getRoute(route: string): Route {
    if (!this.data) throw new Error('Data not fetched');

    const routes = this.data.versions.flatMap((version) =>
      version.routers.flatMap((router) => router.routes)
    );

    const found = routes.find(
      (currentRoute) => routeToSlug(currentRoute.name) === route
    );

    if (!found) throw new Error('Route not found');

    return found;
  }
}
