import fs from 'fs/promises';
import path from 'path';

import { IApiData, Route } from '@typings/core';
import routeToSlug from '@utils/functions/routeToSlug';

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

  /**
   * Get the slugs for all routes.
   * @returns The slugs for all routes.
   */
  public getRouteSlugs(): { title: string; route: string }[] {
    if (!this.data) throw new Error('Data not fetched');
    return this.data.router.routes.map((route) => ({
      title: route.name,
      route: routeToSlug(route.name),
    }));
  }

  /**
   * Get the data for a specific route.
   * @param route The route to get the data for.
   * @returns The route data.
   */
  public getRoute(route: string): Route {
    if (!this.data) throw new Error('Data not fetched');
    return {
      category: this.data.router.name,
      ...this.data.router.routes.find(
        (routeObj) => routeToSlug(routeObj.name) === route
      ),
    } as Route;
  }
}
