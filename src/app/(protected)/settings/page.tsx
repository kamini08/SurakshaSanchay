import { auth, signOut } from "../../../../auth";
// import Dashboard from "@/app/Dashboard/page";
// import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically load BarChart without SSR
const Dashboard = dynamic(() => import("../../Dashboard/page"), { ssr: false });

const SettingsPage = async () => {
  return (
    <div className="text-center">
      {/* Uncomment if you want to display user session info */}
      {/* {JSON.stringify(session?.user)} */}

      {/* Sign Out Form */}
      {/* <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form> */}

      {/* Reload Button */}

      {/* Render Dashboard with a key to force reload */}
      <Dashboard />
    </div>
  );
};

export default SettingsPage;
