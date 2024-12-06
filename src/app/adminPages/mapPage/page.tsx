


import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Map from "@/components/Map/MapDisplay";




const SearchPoliceStation = () => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName="SEARCH POLICE STATION" />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 max-w-full overflow-x-auto"><Map /></div>
    </DefaultLayout>
  );
};

export default SearchPoliceStation;

