import { Button,  Table } from '@components/index';
import ApiData from '@utils/classes/ApiData';

export default async function Home() {
  const apiDataClass = new ApiData();
  const apiData = await apiDataClass.fetch();

  return (
    <div className="max-w-5xl p-5 lg:p-10">
      <h1 className="text-text mt-3 text-5xl font-bold">{apiData.name}</h1>
      <p className="text-text-secondary mt-4">{apiData.description}</p>

      <div className="bg-border my-5 h-px w-full"></div>

      <div className="mt-5">
        <p className="text-text-primary text-2xl font-bold ">Base URL</p>
        <p className="text-text-secondary mt-2">
          This is the base URL for all endpoints. It should be followed by the
          version of the API you&apos;re using.
        </p>
        <div className="group mt-3">
          <button className="group-focus-within:border-primary/90 bg-default group-focus-within:text-primary text-text-primary group-focus-within:bg-primary/10 border-border inline-block rounded-lg border">
            <input
              className="block cursor-text rounded-lg bg-transparent px-3 py-1.5"
              type="text"
              value={apiData.baseUrl}
              disabled
            />
          </button>
          <Button className="ml-2" copy={apiData.baseUrl}>
            Copy
          </Button>
        </div>
      </div>

      {apiData.rateLimit && (
        <div className="mt-10">
          <p className="text-text-primary text-2xl font-bold">
            Global Ratelimit
          </p>
          <p className="text-text-secondary mt-2">
            The global ratelimit applies to all endpoints for every version.
          </p>
          <Table
            data={[
              ['Field', 'Value'],
              ['Status Code', apiData.rateLimit.statusCode ?? 429],
              ['Window', apiData.rateLimit.window ?? '?'],
              ['Max', apiData.rateLimit.max ?? '?'],
            ]}
          />
        </div>
      )}
    </div>
  );
}
