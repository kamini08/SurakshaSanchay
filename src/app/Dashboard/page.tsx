import React from "react";
// import MonthlyReport from "./dash";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import dynamic from "next/dynamic";

// Dynamically load BarChart without SSR
const MonthlyReport = dynamic(() => import("./dash"), {
  ssr: false,
});
const page = () => {
  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="Dashboard" />
      <MonthlyReport />
    </div>
  );
};

export default page;
