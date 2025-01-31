"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import AdminSidebar from "@/components/AdminSidebar";
import UserSidebar from "@/components/UserSidebar";
import Header from "@/components/Header";
import { toast } from "react-toastify";

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("/api/DefaultLayout", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { role } = await response.json();
        setRole(role);
      } catch (error) {
        console.error("Error fetching user role:", error);
        toast.error("Error fetching user role", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUserRole();
  }, []); // Empty dependency array to run only once on mount

  const renderSidebar = () => {
    if (loading) {
      return <div>Loading...</div>; // Show loading state while fetching
    }

    switch (role) {
      case "admin":
        return (
          <AdminSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        );
      case "incharge":
        return (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        );
      case "user":
        return (
          <UserSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        );
      default:
        return null; // Do not render anything if the role is not recognized
    }
  };

  // Only render the layout if the role is present
  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  if (!role) {
    return null; // Do not render anything if role is not present
  }

  return (
    <div className="flex">
      {renderSidebar()}
      <div className="relative flex flex-1 flex-col lg:ml-72.5">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Add your main content here */}

        {/* <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {/* {children} */}
        {/* </div> */}
        {/* </main> */}
      </div>
    </div>
  );
};

export default DefaultLayout;
