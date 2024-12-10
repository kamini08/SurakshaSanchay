"use client";
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { toast } from "react-toastify";

interface Notification {
  id: string;
  userId: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const NotificationTable = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(false); // To show a loading indicator

  // Fetch notifications initially
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Fetch notifications from the server
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/notifications/index");
      if (!response.ok) throw new Error("Failed to fetch notifications");
      const data = await response.json();
      setNotifications(data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Error fetching notifications", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Mark a notification as seen/unseen
  const markAsSeenToggle = async (index: number) => {
    const notification = notifications[index];
    if (!notification) return;

    const updatedSeenState = !notification.read;

    // Optimistically update the state
    setNotifications((prev) => {
      const updated = [...prev];
      updated[index].read = updatedSeenState;
      return updated;
    });

    try {
      const response = await fetch(`/api/notifications/markSeen`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: notification.id, seen: updatedSeenState }),
      });

      if (!response.ok) {
        throw new Error("Failed to toggle notification seen state");
      }
      toast.success("toggling notification to seen state", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error toggling notification seen state:", error);
      toast.error("Error toggling notification seen state", {
        position: "top-right",
        autoClose: 3000,
      });
      // Revert the optimistic update on error
      setNotifications((prev) => {
        const reverted = [...prev];
        reverted[index].read = !updatedSeenState;
        return reverted;
      });
    }
  };

  // Delete selected notifications
  const handleDelete = async () => {
    const idsToDelete = selectedNotifications.map(
      (index) => notifications[index].id,
    );

    try {
      const response = await fetch(`/api/notifications/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: idsToDelete }),
      });

      if (!response.ok) throw new Error("Failed to delete notifications");

      setNotifications((prev) =>
        prev.filter((_, index) => !selectedNotifications.includes(index)),
      );
      setSelectedNotifications([]);
      toast.warning("Item deleted successfully", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error deleting notifications:", error);
      toast.warning("Error deleting notifications", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Refresh notifications
  const handleRefresh = async () => {
    fetchNotifications(); // Refetch notifications from the server
    setSearchQuery("");
    setSelectedNotifications([]);
  };

  // Filter notifications based on the search query
  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Handle checkbox selection
  const handleCheckboxChange = (index: number) => {
    setSelectedNotifications((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="NOTIFICATIONS" />
      <div className="rounded-lg border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
        {/* Toolbar */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={handleDelete}
              className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={handleRefresh}
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Refresh
            </button>
          </div>
          <input
            type="text"
            placeholder="Search for sender or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-1/2 rounded-md border px-4 py-2"
          />
        </div>

        {/* Notification Table */}
        <table className="w-full border-collapse border bg-white">
          <thead>
            <tr className="dark:bg-slate-400">
              <th className="p-3">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedNotifications(
                        filteredNotifications.map((_, index) => index),
                      );
                    } else {
                      setSelectedNotifications([]);
                    }
                  }}
                />
              </th>
              <th className="p-3 dark:text-white text-left">Sender</th>
              <th className="p-3 dark:text-white text-left">Subject</th>
              <th className="p-3 dark:text-white text-left">Date</th>
              <th className="p-3 dark:text-white text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotifications.map((notification, index) => (
              <tr
                key={index}
                className={`${
                  selectedNotifications.includes(index)
                    ? "bg-gray-100"
                    : "hover:bg-gray-50"
                }`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td className="p-3">{notification.userId}</td>
                <td className="p-3">{notification.message}</td>
                <td className="p-3">{notification.createdAt}</td>
                <td className="p-3">
                  <button
                    onClick={() => markAsSeenToggle(index)}
                    className={`rounded-md px-4 py-2 ${
                      notification.read
                        ? "bg-yellow-500 text-white hover:bg-yellow-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {notification.read ? "Unmark as Seen" : "Mark as Seen"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Showing {filteredNotifications.length} of {notifications.length}{" "}
            notifications
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationTable;
