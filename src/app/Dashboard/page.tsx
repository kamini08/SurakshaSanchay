import React from "react";
import MonthlyReport from "./dash";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const page = () => {
  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="Dashboard" />
      <MonthlyReport />
    </div>
  );
};

export default page;
