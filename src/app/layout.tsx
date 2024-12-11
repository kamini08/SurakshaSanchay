"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetch("/api/Role");
        if (!response.ok) {
          throw new Error("Failed to fetch role");
        }
        const role = await response.json();
        setRole(role);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
    setTimeout(() => setLoading(false), 3000);
  }, [role]);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Head>
          <title>SurakshaSanchay 👮</title>
        </Head>
        {role ? (
          <>
            <DefaultLayout />
            <div className="relative min-h-screen w-auto overflow-x-auto dark:bg-boxdark-2 dark:text-bodydark lg:ml-[290px]">
              {loading ? <Loader /> : children}
              <ToastContainer />
            </div>
          </>
        ) : (
          <div>
            {children}
            <ToastContainer />
          </div>
        )}
        {/* <DefaultLayout />
        <div className="relative min-h-screen w-auto overflow-x-auto dark:bg-boxdark-2 dark:text-bodydark lg:ml-[290px]">
          {loading ? <Loader /> : children}
          
        </div> */}
      </body>
    </html>
  );
}
