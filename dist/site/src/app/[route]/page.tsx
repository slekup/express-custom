import { Alert } from '@components/index';
import Responses from '@components/routes/Responses';
import { getRoute, getRouteSlugs } from '@utils/getRoutes';
import routeToSlug from '@utils/routeToSlug';
import Link from 'next/link';

export async function generateStaticParams() {
  const data = await getRouteSlugs();
  console.log(data);
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: { route: string };
}) {
  const route = await getRoute(params.route);

  return {
    title: `${route.name} | API Documentation`,
    description: route.name,
  };
}

export default async function Route({ params }: { params: { route: string } }) {
  const route = await getRoute(params.route);

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
   * Get the response for an endpoint
   * @param text Text to find and replace the reference text
   * @returns Array of JSX elements
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
    return text.split(curlyBracketReg).map((part, i) => {
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

        <div className="">
          {route.endpoints.map((endpoint, index) => (
            <div key={index} className="py-0">
              {/* Name */}
              <h1 className="text-2xl font-bold text-text">{endpoint.name}</h1>
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
              {endpoint.notes &&
                endpoint.notes.map((note) => (
                  <Alert type={note.type} text={note.text} />
                ))}
              {/* Description */}
              <p className="mt-3 font-medium text-text-secondary">
                {replaceReferenceText(endpoint.description)}
              </p>
              {/* Params */}
              {endpoint.params && Object.keys(endpoint.params).length > 0 && (
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
                    {endpoint.params &&
                      Object.values(endpoint.params).map(
                        (param, paramIndex) => (
                          <tr key={paramIndex}>
                            <td className="px-3 py-2 text-sm font-medium text-text">
                              {param.name}
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
              {endpoint.queries && Object.keys(endpoint.queries).length > 0 && (
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
                    {endpoint.queries &&
                      Object.values(endpoint.queries).map(
                        (query, queryIndex) => (
                          <tr key={queryIndex}>
                            <td className="px-3 py-2 text-sm font-medium text-text">
                              {query.name}
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
              {endpoint.body && Object.keys(endpoint.body).length > 0 && (
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
                    {endpoint.body &&
                      Object.values(endpoint.body).map((value, valueIndex) => (
                        <tr key={valueIndex}>
                          <td className="px-3 py-2 text-sm font-medium text-text">
                            {value.name}
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
                      ))}
                  </tbody>
                </table>
              )}

              {/* Responses */}
              {endpoint.responses && endpoint.responses.length > 0 && (
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
