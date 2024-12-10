// import MapComponent from "@/components/Map/MapDisplay";
import dynamic from "next/dynamic";

// Dynamically load BarChart without SSR
const MapComponent = dynamic(() => import("@/components/Map/MapDisplay"), {
  ssr: false,
});
const page = () => {
  return (
    <div>
      <MapComponent />
    </div>
  );
};

export default page;
