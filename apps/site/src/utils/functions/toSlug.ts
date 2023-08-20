const toSlug = (str: string): string =>
  str
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, '-');

export default toSlug;
