import { Metadata } from 'next';
import Link from 'next/link';

import { Alert } from '@components/index';
import Responses from '@components/routes/Responses';
import { Structure } from '@typings/core';
import ApiData from '@utils/classes/ApiData';
import routeToSlug from '@utils/functions/routeToSlug';

export async function generateStaticParams() {
  const apiData = new ApiData();
  await apiData.fetch();
  const slugs = apiData.getRouteSlugs();
  return slugs;
}

export async function generateMetadata({
  params,
}: {
  params: { route: string };
}): Promise<Metadata> {
  const apiData = new ApiData();
  await apiData.fetch();
  const route = apiData.getRoute(params.route);

  return {
    title: `${route.name} | API Documentation`,
    description: route.name,
  };
}

export default async function Route({ params }: { params: { route: string } }) {
  const apiData = new ApiData();
  const data = await apiData.fetch();
  const route = apiData.getRoute(params.route);

  const endpointMethodStyle = {
    GET: 'border-blue-500/75 bg-blue-500/30',
    POST: 'border-green-500/75 bg-green-500/30',
    PATCH: 'border-orange-500/75 bg-orange-500/30',
    PUT: 'border-yellow-500/75 bg-yellow-500/30',
    DELETE: 'border-red-500/75 bg-red-500/30',
    OPTIONS: 'border-purple-500/75 bg-purple-500/30',
    HEAD: 'border-gray-500/75 bg-gray-500/30',
    TRACE: 'border-gray-500/75 bg-gray-500/30',
    CONNECT: 'border-gray-500/75 bg-gray-500/30',
  };

  /**
   * Get structure names from a string.
   * @param str String to get the structure names from.
   * @returns Array of structure names.
   */
  const getStructureNames = (str: string): string[] => {
    const curlyBracketRegex = /\{(.+?)\}/g;

    const matches: string[] = [];

    let match = curlyBracketRegex.exec(str);
    while (match !== null) {
      const value = match[1]; // get the string inside the braces
      matches.push(value);
      match = curlyBracketRegex.exec(str); // assign a new value to match
    }

    return matches;
  };

  /**
   * Filters out duplicate names from an array of structures.
   * @param arr The array of structures.
   * @returns The filtered array of structures.
   */
  const duplicateNames = (arr: Structure[]) => {
    const seen: Record<string, unknown> = {};
    const filtered = arr.filter((obj) => {
      if (Object.prototype.hasOwnProperty.call(seen, obj.name)) {
        return false;
      }
      seen[obj.name] = true;
      return true;
    });
    return filtered;
  };

  /**
   * Get structures from field names.
   * @param structureNames Array of structure names.
   * @param type Type of structure to get.
   * @returns Array of structure.
   */
  const getStructuresFromNames = (
    structureNames: string[],
    type: 'schema' | 'option'
  ): Structure[] => {
    const structures: Structure[] = [];

    for (const structureName of structureNames) {
      const structure = data.structures?.find(
        (structure) => structure.name === structureName
      );
      if (!structure) continue;
      structures.push(structure);

      // Get schema/option values from fields (which are in turn the names of other structures)
      const fieldStructureNames = structure.fields.map(
        (field) => field[type] as string
      );

      if (fieldStructureNames.length > 0)
        structures.push(...getStructuresFromNames(fieldStructureNames, type));
    }

    return structures;
  };

  /**
   * Get schemas from the document.
   * @returns Array of schemas.
   */
  const getSchemas = (): Structure[] => {
    if (!data.structures) return [];
    const schemaNames: string[] = [];

    route.endpoints.forEach((endpoint) => {
      schemaNames.push(...getStructureNames(endpoint.description));
    });

    const uniqueSchemaNames = schemaNames.reduce(
      (unique: string[], item: string) =>
        unique.includes(item) ? unique : [...unique, item],
      []
    );

    const schemas = getStructuresFromNames(uniqueSchemaNames, 'schema').filter(
      (structure) => structure.type === 'schema'
    );

    return duplicateNames(schemas);
  };

  /**
   * Get options from the document.
   * @returns Array of options.
   */
  const getOptions = (): Structure[] => {
    if (!data.structures) return [];
    const optionNames: string[] = [];

    route.endpoints.forEach((endpoint) => {
      optionNames.push(...getStructureNames(endpoint.description));
    });

    const uniqueOptionNames = optionNames.reduce(
      (unique: string[], item: string) =>
        unique.includes(item) ? unique : [...unique, item],
      []
    );

    const options = getStructuresFromNames(uniqueOptionNames, 'option').filter(
      (option) => option.type === 'option'
    );

    return duplicateNames(options);
  };

  /**
   * Get the response for an endpoint.
   * @param text Text to find and replace the reference text.
   * @returns Array of JSX elements.
   */
  const replaceReferenceText = (text: string): JSX.Element | JSX.Element[] => {
    if (text === 'string')
      return (
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String"
          target="_blank"
          className="hover:underline"
        >
          string
        </a>
      );

    if (text === 'number')
      return (
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number"
          target="_blank"
          className="hover:underline"
        >
          number
        </a>
      );

    if (text === 'boolean')
      return (
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean"
          target="_blank"
          className="hover:underline"
        >
          boolean
        </a>
      );

    if (text === 'array')
      return (
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"
          target="_blank"
          className="hover:underline"
        >
          string
        </a>
      );

    if (text === 'object')
      return (
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object"
          target="_blank"
          className="hover:underline"
        >
          string
        </a>
      );

    const curlyBracketReg = /(\{.+?\})/g;
    return text.split(curlyBracketReg).map((part) => {
      if (part.match(curlyBracketReg)) {
        const match = part.slice(1, -1);
        return (
          <Link
            href={`/${routeToSlug(route.name)}#${match}`}
            key={match}
            className="link"
          >
            {match.split('.')[match.split('.').length - 1]}
          </Link>
        );
      } else {
        return <>{part}</>;
      }
    });
  };

  return (
    <>
      <div className="min-h-[800px] flex-grow p-5 lg:p-10">
        <p className="text-xs font-semibold uppercase text-text-faint">
          {route.category}
        </p>
        <h1 className="mt-3 text-4xl font-bold text-text">{route.name}</h1>
        <p className="mt-4 text-text-secondary">{route.description}</p>
        <div className="my-5 h-px w-full bg-border"></div>

        <div className="-top-36 mt-36 relative">
          {route.endpoints.map((endpoint, index) => (
            <div key={index} className="py-0">
              {/* Name */}
              <h1
                className="text-2xl font-bold text-text endpoint-header"
                id={routeToSlug(endpoint.name)}
              >
                {endpoint.name}
              </h1>
              {/* URL */}
              <div className="mt-2">
                <p
                  className={`-mt-1 mr-2 inline-block rounded-3xl border px-3 py-0.5 text-sm font-medium text-text ${
                    endpointMethodStyle[endpoint.method]
                  }`}
                >
                  {endpoint.method}
                </p>
                <code className="text-xl font-bold text-text-primary">
                  /{routeToSlug(route.name)}
                  {endpoint.path}
                </code>
              </div>
              {/* Messages */}
              {endpoint.notes.map((note, noteIndex) => (
                <Alert key={noteIndex} type={note.type} text={note.text} />
              ))}
              {/* Description */}
              <p className="mt-3 font-medium text-text-secondary">
                {replaceReferenceText(endpoint.description)}
              </p>
              {/* Params */}
              {Object.keys(endpoint.params).length > 0 && (
                <table className="text-left">
                  <thead className="uppercase">
                    <tr>
                      <th className="px-3 py-2 text-sm font-medium text-text-secondary">
                        URL Params
                      </th>
                      <th className="px-3 py-2 text-sm font-medium text-text-secondary">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(endpoint.params).map(
                      ([paramKey, param], paramIndex) => (
                        <tr key={paramIndex}>
                          <td className="px-3 py-2 text-sm font-medium text-text">
                            {paramKey}
                            <span className="-my-1 ml-0.5 inline-block text-lg font-bold text-danger">
                              *
                            </span>
                          </td>
                          <td className="px-3 py-2 text-sm font-medium text-text-secondary">
                            {replaceReferenceText(param.description)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              )}
              {/* Queries */}
              {Object.keys(endpoint.queries).length > 0 && (
                <table className="text-left">
                  <thead className="uppercase">
                    <tr>
                      <th className="px-3 py-2 text-sm font-medium text-text-secondary">
                        URL Queries
                      </th>
                      <th className="px-3 py-2 text-sm font-medium text-text-secondary">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(endpoint.queries).map(
                      ([queryKey, query], queryIndex) => (
                        <tr key={queryIndex}>
                          <td className="px-3 py-2 text-sm font-medium text-text">
                            {queryKey}
                            {query.required && (
                              <span className="-my-1 ml-0.5 inline-block text-lg font-bold text-danger">
                                *
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-2 text-sm font-medium text-text-secondary">
                            {replaceReferenceText(query.description)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              )}
              {/* Body */}
              {Object.keys(endpoint.body).length > 0 && (
                <table className="text-left">
                  <thead className="uppercase">
                    <tr>
                      <th className="px-3 py-2 text-sm font-medium text-text-secondary">
                        JSON Body
                      </th>
                      <th className="px-3 py-2 text-sm font-medium text-text-secondary">
                        Type
                      </th>
                      <th className="px-3 py-2 text-sm font-medium text-text-secondary">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(endpoint.body).map(
                      ([key, value], valueIndex) => (
                        <tr key={valueIndex}>
                          <td className="px-3 py-2 text-sm font-medium text-text">
                            {key}
                            {value.required && (
                              <span className="-my-1 ml-0.5 inline-block text-lg font-bold text-danger">
                                *
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-2 text-sm font-medium text-text">
                            {replaceReferenceText(value.type)}
                          </td>
                          <td className="px-3 py-2 text-sm font-medium text-text-secondary">
                            {replaceReferenceText(value.description)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              )}

              {/* Responses */}
              {endpoint.responses.length > 0 && (
                <Responses index={index} responses={endpoint.responses} />
              )}

              <div className="my-10 h-px w-full bg-border"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
