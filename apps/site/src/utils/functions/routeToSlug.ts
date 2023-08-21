/**
 * Get the data for a specific route.
 * @param route The route to get the data for.
 * @returns The route data.
 */
const routeToSlug = (route: string): string =>
  route
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, '-');

export default routeToSlug;
