import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

// import Map from "@/components/Map/MapDisplay";
import dynamic from "next/dynamic";

// Dynamically load BarChart without SSR
const Map = dynamic(() => import("@/components/Map/MapDisplay"), {
  ssr: false,
});
const SearchPoliceStation = () => {
  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="SEARCH POLICE STATION" />
      <div className="max-w-full overflow-x-auto rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <Map />
      </div>
    </div>
  );
};

export default SearchPoliceStation;
