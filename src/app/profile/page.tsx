"use client";
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Example profile data, including a `stars` field
  const [profileData, setProfileData] = useState({
    role: "Administrator",
    govId: "123456789",
    name: "John Doe",
    email: "johndoe@example.com",
    password: "********",
    location: "New York, USA",
    phone: "+1 234 567 890",
    profileImage: "/images/user/user-06.png", // Default profile image
    stars: 3, // Number of filled stars
  });

  const [formData, setFormData] = useState({ ...profileData });
  const [profileImage, setProfileImage] = useState(profileData.profileImage);

  // Example fine array
  const fineArray = [
    {
      amount: 50,
      reason: "Missed Deadline",
      starsReduced: 2,
      description: "Missed submitting the report on time.",
    },
    {
      amount: 20,
      reason: "Improper Conduct",
      starsReduced: 1,
      description: "Violation of team meeting protocols.",
    },
  ];

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setFormData({ ...formData, profileImage: imageUrl });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileData({ ...formData });
    setIsEditing(false);
  };

  // Generate stars based on the stars field value in profileData
  const generateStars = (numStars: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="text-2xl">
        {index < numStars ? "★" : "☆"}
      </span>
    ));
  };

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Profile" />
        <div className="relative overflow-hidden rounded-sm border border-stroke bg-white p-6 text-center shadow-default dark:border-strokedark dark:bg-boxdark">
          {/* Profile Picture with Stars */}
          <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border border-stroke">
            <Image
              src={profileImage}
              alt="Profile"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
            {isEditing && (
              <label
                htmlFor="profileImage"
                className="absolute bottom-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90"
              >
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                  />
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </svg>
              </label>
            )}
          </div>

          {/* Display Stars */}
          <div className="mt-4 text-center">
            <div className="text-yellow-500">
              {generateStars(profileData.stars)}
            </div>
          </div>

          {/* Name and Role */}
          <div className="mt-4">
            <h2 className="text-xl font-bold dark:text-white">
              {profileData.name}
            </h2>
            <p className="text-gray-500 dark:text-gray-300">
              {profileData.role}
            </p>
          </div>

          {/* Profile Content */}
          <div className="mt-6">
            {!isEditing ? (
              <div className="space-y-4">
                <p>
                  <strong>Gov ID:</strong> {profileData.govId}
                </p>
                <p>
                  <strong>Email:</strong> {profileData.email}
                </p>
                <p>
                  <strong>Location:</strong> {profileData.location}
                </p>
                <p>
                  <strong>Phone:</strong> {profileData.phone || "Not Provided"}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="govId" className="block font-medium">
                    Gov ID
                  </label>
                  <input
                    type="text"
                    id="govId"
                    name="govId"
                    value={formData.govId}
                    onChange={handleChange}
                    className="w-full rounded border px-4 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded border px-4 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block font-medium">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full rounded border px-4 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block font-medium">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded border px-4 py-2"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 rounded bg-primary px-6 py-2 text-white hover:bg-opacity-80"
                >
                  Save Changes
                </button>
              </form>
            )}
          </div>

          {/* Edit Button in Bottom Right */}
          <button
            onClick={handleEditClick}
            className="absolute bottom-4 right-4 rounded bg-primary px-4 py-2 text-white hover:bg-opacity-80"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Fine Section */}
        {fineArray && fineArray.length > 0 && (
          <div className="mt-6 rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <h3 className="mb-4 text-lg font-bold">Fine Details</h3>
            {fineArray.map((fine, index) => (
              <div
                key={index}
                className="mb-4 rounded border border-gray-200 p-4 dark:border-strokedark"
              >
                <p>
                  <strong>Amount:</strong> ${fine.amount}
                </p>
                <p>
                  <strong>Reason:</strong> {fine.reason}
                </p>
                <p>
                  <strong>Stars Reduced:</strong>{" "}
                  {generateStars(fine.starsReduced)}
                </p>
                <p>
                  <strong>Description:</strong> {fine.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

