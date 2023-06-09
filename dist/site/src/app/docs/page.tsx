import ApiData from '@utils/classes/ApiData';

export default function Docs() {
  const apiDataClass = new ApiData();
  const apiData = apiDataClass.fetch();

  return (
    <>
      <div className=""></div>
    </>
  );
}
