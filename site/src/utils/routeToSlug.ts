export default function routeToSlug(route: string): string {
  return route
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, '-');
}
