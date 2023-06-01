import { Button } from '@components/index';
import ApiData from '@utils/classes/ApiData';

export default async function Home() {
  const apiDataClass = new ApiData();
  const apiData = await apiDataClass.fetch();

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-text">{apiData.name}</h1>
      <p className="text-lg text-text-secondary font-medium mt-2">
        {apiData.description}
      </p>
      <div className="h-px w-full bg-border my-5"></div>
      <Button>Button</Button>
    </div>
  );
}
