'use client';
import { useState } from "react";

interface Notification {
  sender: string;
  subject: string;
  date: string;
}

const NotificationTable = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { sender: "Musharof Chowdhury", subject: "Some note & Lorem Ipsum available.", date: "17 Oct, 2024" },
    { sender: "Naimur Rahman", subject: "Lorem Ipsum alteration in some form.", date: "25 Nov, 2024" },
    { sender: "Juhan Ahamed", subject: "Lorem Ipsum available in some form.", date: "25 Nov, 2024" },
    { sender: "Mahbub Hasan", subject: "Lorem Ipsum alteration available.", date: "19 Dec, 2024" },
    { sender: "Shafiq Hammad", subject: "Lorem Ipsum available in some form.", date: "20 Dec, 2024" },
  ]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);

  const handleDelete = () => {
    setNotifications((prev) =>
      prev.filter((_, index) => !selectedNotifications.includes(index))
    );
    setSelectedNotifications([]);
  };

  const handleRefresh = () => {
    setNotifications([...notifications]); // Reset the state
    setSearchQuery("");
    setSelectedNotifications([]);
  };

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckboxChange = (index: number) => {
    if (selectedNotifications.includes(index)) {
      setSelectedNotifications((prev) => prev.filter((i) => i !== index));
    } else {
      setSelectedNotifications((prev) => [...prev, index]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      {/* Toolbar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={handleRefresh}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Refresh
          </button>
        </div>
        <input
          type="text"
          placeholder="Search for sender or subject..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-md px-4 py-2 w-1/2"
        />
      </div>

      {/* Notification Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedNotifications(
                      filteredNotifications.map((_, index) => index)
                    );
                  } else {
                    setSelectedNotifications([]);
                  }
                }}
              />
            </th>
            <th className="p-3 text-left">Sender</th>
            <th className="p-3 text-left">Subject</th>
            <th className="p-3 text-left">Date</th>
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
              <td className="p-3">{notification.sender}</td>
              <td className="p-3">{notification.subject}</td>
              <td className="p-3">{notification.date}</td>
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
  );
};

export default NotificationTable;
