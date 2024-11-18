// // import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// // import Image from "next/image";
// // import DefaultLayout from "@/components/Layouts/DefaultLayout";



// // const Settings = () => {
// //   return (
// //     <DefaultLayout>
// //       <div className="mx-auto max-w-270">
// //         <Breadcrumb pageName="Settings" />

// //         <div className="grid grid-cols-5 gap-8">
// //           <div className="col-span-5 xl:col-span-3">
// //             <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
// //               <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
// //                 <h3 className="font-medium text-black dark:text-white">
// //                   Personal Information
// //                 </h3>
// //               </div>
// //               <div className="p-7">
// //                 <form action="#">
// //                   <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
// //                     <div className="w-full sm:w-1/2">
// //                       <label
// //                         className="mb-3 block text-sm font-medium text-black dark:text-white"
// //                         htmlFor="fullName"
// //                       >
// //                         Full Name
// //                       </label>
// //                       <div className="relative">
// //                         <span className="absolute left-4.5 top-4">
// //                           <svg
// //                             className="fill-current"
// //                             width="20"
// //                             height="20"
// //                             viewBox="0 0 20 20"
// //                             fill="none"
// //                             xmlns="http://www.w3.org/2000/svg"
// //                           >
// //                             <g opacity="0.8">
// //                               <path
// //                                 fillRule="evenodd"
// //                                 clipRule="evenodd"
// //                                 d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
// //                                 fill=""
// //                               />
// //                               <path
// //                                 fillRule="evenodd"
// //                                 clipRule="evenodd"
// //                                 d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
// //                                 fill=""
// //                               />
// //                             </g>
// //                           </svg>
// //                         </span>
// //                         <input
// //                           className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
// //                           type="text"
// //                           name="fullName"
// //                           id="fullName"
// //                           placeholder="Devid Jhon"
// //                           defaultValue="Devid Jhon"
// //                         />
// //                       </div>
// //                     </div>

// //                     <div className="w-full sm:w-1/2">
// //                       <label
// //                         className="mb-3 block text-sm font-medium text-black dark:text-white"
// //                         htmlFor="phoneNumber"
// //                       >
// //                         Phone Number
// //                       </label>
// //                       <input
// //                         className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
// //                         type="text"
// //                         name="phoneNumber"
// //                         id="phoneNumber"
// //                         placeholder="+990 3343 7865"
// //                         defaultValue="+990 3343 7865"
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="mb-5.5">
// //                     <label
// //                       className="mb-3 block text-sm font-medium text-black dark:text-white"
// //                       htmlFor="emailAddress"
// //                     >
// //                       Email Address
// //                     </label>
// //                     <div className="relative">
// //                       <span className="absolute left-4.5 top-4">
// //                         <svg
// //                           className="fill-current"
// //                           width="20"
// //                           height="20"
// //                           viewBox="0 0 20 20"
// //                           fill="none"
// //                           xmlns="http://www.w3.org/2000/svg"
// //                         >
// //                           <g opacity="0.8">
// //                             <path
// //                               fillRule="evenodd"
// //                               clipRule="evenodd"
// //                               d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
// //                               fill=""
// //                             />
// //                             <path
// //                               fillRule="evenodd"
// //                               clipRule="evenodd"
// //                               d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
// //                               fill=""
// //                             />
// //                           </g>
// //                         </svg>
// //                       </span>
// //                       <input
// //                         className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
// //                         type="email"
// //                         name="emailAddress"
// //                         id="emailAddress"
// //                         placeholder="devidjond45@gmail.com"
// //                         defaultValue="devidjond45@gmail.com"
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="mb-5.5">
// //                     <label
// //                       className="mb-3 block text-sm font-medium text-black dark:text-white"
// //                       htmlFor="Username"
// //                     >
// //                       Username
// //                     </label>
// //                     <input
// //                       className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
// //                       type="text"
// //                       name="Username"
// //                       id="Username"
// //                       placeholder="devidjhon24"
// //                       defaultValue="devidjhon24"
// //                     />
// //                   </div>

// //                   <div className="mb-5.5">
// //                     <label
// //                       className="mb-3 block text-sm font-medium text-black dark:text-white"
// //                       htmlFor="Username"
// //                     >
// //                       BIO
// //                     </label>
// //                     <div className="relative">
// //                       <span className="absolute left-4.5 top-4">
// //                         <svg
// //                           className="fill-current"
// //                           width="20"
// //                           height="20"
// //                           viewBox="0 0 20 20"
// //                           fill="none"
// //                           xmlns="http://www.w3.org/2000/svg"
// //                         >
// //                           <g opacity="0.8" clipPath="url(#clip0_88_10224)">
// //                             <path
// //                               fillRule="evenodd"
// //                               clipRule="evenodd"
// //                               d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
// //                               fill=""
// //                             />
// //                             <path
// //                               fillRule="evenodd"
// //                               clipRule="evenodd"
// //                               d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
// //                               fill=""
// //                             />
// //                           </g>
// //                           <defs>
// //                             <clipPath id="clip0_88_10224">
// //                               <rect width="20" height="20" fill="white" />
// //                             </clipPath>
// //                           </defs>
// //                         </svg>
// //                       </span>

// //                       <textarea
// //                         className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
// //                         name="bio"
// //                         id="bio"
// //                         rows={6}
// //                         placeholder="Write your bio here"
// //                         defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet."
// //                       ></textarea>
// //                     </div>
// //                   </div>

// //                   <div className="flex justify-end gap-4.5">
// //                     <button
// //                       className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
// //                       type="submit"
// //                     >
// //                       Cancel
// //                     </button>
// //                     <button
// //                       className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
// //                       type="submit"
// //                     >
// //                       Save
// //                     </button>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //           <div className="col-span-5 xl:col-span-2">
// //             <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
// //               <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
// //                 <h3 className="font-medium text-black dark:text-white">
// //                   Your Photo
// //                 </h3>
// //               </div>
// //               <div className="p-7">
// //                 <form action="#">
// //                   <div className="mb-4 flex items-center gap-3">
// //                     <div className="h-14 w-14 rounded-full">
// //                       <Image
// //                         src={"/images/user/user-03.png"}
// //                         width={55}
// //                         height={55}
// //                         alt="User"
// //                       />
// //                     </div>
// //                     <div>
// //                       <span className="mb-1.5 text-black dark:text-white">
// //                         Edit your photo
// //                       </span>
// //                       <span className="flex gap-2.5">
// //                         <button className="text-sm hover:text-primary">
// //                           Delete
// //                         </button>
// //                         <button className="text-sm hover:text-primary">
// //                           Update
// //                         </button>
// //                       </span>
// //                     </div>
// //                   </div>

// //                   <div
// //                     id="FileUpload"
// //                     className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
// //                   >
// //                     <input
// //                       type="file"
// //                       accept="image/*"
// //                       className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
// //                     />
// //                     <div className="flex flex-col items-center justify-center space-y-3">
// //                       <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
// //                         <svg
// //                           width="16"
// //                           height="16"
// //                           viewBox="0 0 16 16"
// //                           fill="none"
// //                           xmlns="http://www.w3.org/2000/svg"
// //                         >
// //                           <path
// //                             fillRule="evenodd"
// //                             clipRule="evenodd"
// //                             d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
// //                             fill="#3C50E0"
// //                           />
// //                           <path
// //                             fillRule="evenodd"
// //                             clipRule="evenodd"
// //                             d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
// //                             fill="#3C50E0"
// //                           />
// //                           <path
// //                             fillRule="evenodd"
// //                             clipRule="evenodd"
// //                             d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
// //                             fill="#3C50E0"
// //                           />
// //                         </svg>
// //                       </span>
// //                       <p>
// //                         <span className="text-primary">Click to upload</span> or
// //                         drag and drop
// //                       </p>
// //                       <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
// //                       <p>(max, 800 X 800px)</p>
// //                     </div>
// //                   </div>

// //                   <div className="flex justify-end gap-4.5">
// //                     <button
// //                       className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
// //                       type="submit"
// //                     >
// //                       Cancel
// //                     </button>
// //                     <button
// //                       className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
// //                       type="submit"
// //                     >
// //                       Save
// //                     </button>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </DefaultLayout>
// //   );
// // };

// // export default Settings;

// "use client";

// import { useState,ChangeEvent, FormEvent } from "react";
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import MultiSelect from "@/components/FormElements/MultiSelect";

// const Modal = ({ show, onClose, children }) => {
//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
//     <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl overflow-auto max-h-[90vh] relative">
//       {/* Close button */}
//       <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={onClose}>
//         X
//       </button>
//       <div>{children}</div>
//     </div>
//   </div>
//   );
// };

// const AddInventory = () => {
//   // State for Inventory Form
//   const [inventoryFormData, setInventoryFormData] = useState({
//     itemId: "",
//     category: [] as string[],
//     categoryDetails: {},
//     type: "",
//     description: "",
//     quantity: 1,
//     location: "",
//     condition: "",
//     acquisitionDate: "",
//     expiryDate: "",
//     price: "",
//     supplier: "",
//     returnDate: "",
//     lastInspectionDate: "",
//     maintenanceSchedule: "",
//     maintenanceCharge: "",
//     issuedTo: "",
//     userId: "",
//   });

//   // Handle field changes for Inventory
//   const handleInventoryChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setInventoryFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const [showModal, setShowModal] = useState(false); // To toggle the table form
//   const [categoryType, setCategoryType] = useState(""); // Store selected category type 

//   // Handle multi-select change for categories
//   // const handleCategoryChange = (selectedCategories: string[]) => {
//   //   setInventoryFormData((prev) => ({ ...prev, category: selectedCategories }));
//   // };
//   // const handleCategoryChange = (selectedCategories) => {
//   //   setInventoryFormData({ ...inventoryFormData, category: selectedCategories });
//   //   setCategoryType(""); // Reset category type when categories change
//   //   // setShowCategoryForm(false); // Hide table form initially
//   // };

//   const handleCategorySelection = (category) => {
//     setCategoryType(category); // Set category type
//     setShowModal(true);  // Show the form based on the selected category
//   };

//   // const handleCategoryFormSubmit = () => {
//   //   // Handle the form submission for category details
//   //   setInventoryFormData({
//   //     ...inventoryFormData,
//   //     categoryDetails: {
//   //       ...inventoryFormData.categoryDetails,
//   //       [categoryType]: inventoryFormData.categoryDetails[categoryType] || {},
//   //     },
//   //   });
//   //   setShowModal(false); // Hide table form after submission
//   // };
    
//   const handleCategoryChange = (selectedCategories) => {
//     // Auto-show the form when a category is selected
//     const selectedCategory = selectedCategories[0]; // Assuming single category for this case
//     setInventoryFormData({ ...inventoryFormData, category: selectedCategories });
//     setCategoryType(selectedCategory); // Automatically set the category type
//   };

//   const handleCategoryFormSubmit = () => {
//     // Handle the form submission for category details
//     setInventoryFormData({
//       ...inventoryFormData,
//       categoryDetails: {
//         ...inventoryFormData.categoryDetails,
//         [categoryType]: inventoryFormData.categoryDetails[categoryType] || {},
//       },
//     });
//     setCategoryType(""); // Reset form after submission
//   };
 
//   // Submit Inventory Form
//   const handleInventorySubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/api/inventory", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(inventoryFormData),
//       });

//       if (response.ok) {
//         alert("Inventory added successfully!");
//         setInventoryFormData({
//           itemId: "",
//           category: [],
//           categoryDetails: {},
//           type: "",
//           description: "",
//           quantity: 1,
//           location: "",
//           condition: "",
//           acquisitionDate: "",
//           expiryDate: "",
//           price: "",
//           supplier: "",
//           returnDate: "",
//           lastInspectionDate: "",
//           maintenanceSchedule: "",
//           maintenanceCharge: "",
//           issuedTo: "",
//           userId: "",
//         });
//       } else {
//         const errorData = await response.json();
//         alert(`Error: ${errorData.message}`);
//       }
//     } catch (error) {
//       console.error("Error submitting inventory form:", error);
//       alert("Failed to submit the inventory.");
//     }
//   };

//   const renderCategoryForm = () => {
//     switch (categoryType) {
//       case "communicationDevice":
//         return (
//           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//   <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
//     <h3 className="font-medium text-black dark:text-white">
//       Communication Device Form
//     </h3>
//   </div>
//   <form action="#">
//     <div className="p-6.5">
//       {/* Inventory Item ID */}
//       <div className="mb-4.5">
//         <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//           Inventory Item ID
//         </label>
//         <input
//           type="text"
//           placeholder="Enter inventory item ID"
//           className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//         />
//       </div>

//       {/* Frequency Range */}
//       <div className="mb-4.5">
//         <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//           Frequency Range
//         </label>
//         <input
//           type="text"
//           placeholder="Enter frequency range"
//           className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//         />
//       </div>

//       {/* Battery Type */}
//       <div className="mb-4.5">
//         <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//           Battery Type
//         </label>
//         <input
//           type="text"
//           placeholder="Enter battery type"
//           className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//         />
//       </div>

//       {/* Connectivity */}
//       <div className="mb-4.5">
//         <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//           Connectivity
//         </label>
//         <input
//           type="text"
//           placeholder="Enter connectivity type (e.g., Bluetooth, Wi-Fi)"
//           className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//         />
//       </div>

//       <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
//         Submit
//       </button>
//     </div>
//   </form>
// </div>
//         );
//       case "vehicleAndAccessories":
//         return (
//           <div className="space-y-4">
//             <label className="block">
//               <span className="text-gray-700">Vehicle Type</span>
//               <input
//                 type="text"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 onChange={(e) => {
//                   const updatedDetails = { ...inventoryFormData.categoryDetails };
//                   updatedDetails[categoryType] = { ...updatedDetails[categoryType], vehicleType: e.target.value };
//                   setInventoryFormData({ ...inventoryFormData, categoryDetails: updatedDetails });
//                 }}
//                 value={inventoryFormData.categoryDetails[categoryType]?.vehicleType || ""}
//               />
//             </label>
//             <label className="block">
//               <span className="text-gray-700">Vehicle ID</span>
//               <input
//                 type="text"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 onChange={(e) => {
//                   const updatedDetails = { ...inventoryFormData.categoryDetails };
//                   updatedDetails[categoryType] = { ...updatedDetails[categoryType], vehicleId: e.target.value };
//                   setInventoryFormData({ ...inventoryFormData, categoryDetails: updatedDetails });
//                 }}
//                 value={inventoryFormData.categoryDetails[categoryType]?.vehicleId || ""}
//               />
//             </label>
//             <label className="block">
//               <span className="text-gray-700">Accessories</span>
//               <input
//                 type="text"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 onChange={(e) => {
//                   const updatedDetails = { ...inventoryFormData.categoryDetails };
//                   updatedDetails[categoryType] = { ...updatedDetails[categoryType], accessories: e.target.value };
//                   setInventoryFormData({ ...inventoryFormData, categoryDetails: updatedDetails });
//                 }}
//                 value={inventoryFormData.categoryDetails[categoryType]?.accessories || ""}
//               />
//             </label>
//           </div>
//         );
//       // Add more case blocks for other categories as needed.
//       default:
//         return null;
//     }
//   };

//   return (
//     <DefaultLayout>
//       <Breadcrumb pageName="ADD INVENTORY FORM" />

//       {/* Full-Width Inventory Form */}
//       <div className="flex flex-col gap-9 overflow-x-hidden ">
//         <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//           <form onSubmit={handleInventorySubmit}>
//             <div className="p-6.5 grid grid-cols-1 gap-6 sm:grid-cols-3">
//               {/* Item ID */}
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Item ID <span className="text-meta-1">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="itemId"
//                   placeholder="Enter Item ID"
//                   value={inventoryFormData.itemId}
//                   onChange={handleInventoryChange}
//                   required
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                 />
//               </div>

//               {/* Category */}
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Category <span className="text-meta-1">*</span>
//                 </label>
//                 <MultiSelect
//                   id="category"
//                   options={[
//                     "communicationDevice",
//                     "computerAndITEquipment",
//                     "networkingEquipment",
//                     "surveillanceAndTracking",
//                     "vehicleAndAccessories",
//                     "protectiveGear",
//                     "firearm",
//                     "forensicEquipment",
//                     "medicalFirstAid",
//                     "officeSupply",
//                   ]}
//                   selectedOptions={inventoryFormData.category}
//                   onChange={handleCategoryChange}
//                 />
//                  {/* Display the category selection buttons */}
//       {inventoryFormData.category.length > 0 && (
//         <div>
//           <p>Select a category to enter details:</p>
//           {inventoryFormData.category.map((category, index) => (
//             <button key={index} onClick={() => handleCategorySelection(category)}>
//               {category}
//             </button>
//           ))}
//               </div>
//       )}
//                <Modal show={showModal} onClose={() => setShowModal(false)}>
//         {renderCategoryForm()}
//         <button className="mt-3" onClick={handleCategoryFormSubmit}>
//           Submit Details
//         </button>
//       </Modal>
//               </div>

//               {/* Type */}
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Type <span className="text-meta-1">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="type"
//                   placeholder="Enter Type"
//                   value={inventoryFormData.type}
//                   onChange={handleInventoryChange}
//                   required
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                 />
//               </div>

//               {/* Description */}
//               <div className="col-span-2">
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Description <span className="text-meta-1">*</span>
//                 </label>
//                 <textarea
//                   name="description"
//                   placeholder="Enter Description"
//                   value={inventoryFormData.description}
//                   onChange={handleInventoryChange}
//                   required
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                 />
//               </div>

//               {/* Quantity */}
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Quantity <span className="text-meta-1">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   name="quantity"
//                   value={inventoryFormData.quantity}
//                   onChange={handleInventoryChange}
//                   required
//                   min="1"
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                 />
//               </div>

//               {/* Location */}
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Location <span className="text-meta-1">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="location"
//                   placeholder="Enter Location"
//                   value={inventoryFormData.location}
//                   onChange={handleInventoryChange}
//                   required
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                 />
//               </div>

//               {/* Condition */}
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Condition <span className="text-meta-1">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="condition"
//                   placeholder="Enter Condition"
//                   value={inventoryFormData.condition}
//                   onChange={handleInventoryChange}
//                   required
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                 />
//               </div>

//               {/* Acquisition Date */}
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Acquisition Date <span className="text-meta-1">*</span>
//                 </label>
//                 <input
//                   type="date"
//                   name="acquisitionDate"
//                   value={inventoryFormData.acquisitionDate}
//                   onChange={handleInventoryChange}
//                   required
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                 />
//               </div>
//               {/* Expiry Date */}
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Expiry Date
//                 </label>
//                 <input
//                   type="date"
//                   name="expiryDate"
//                   value={inventoryFormData.expiryDate}
//                   onChange={handleInventoryChange}
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                 />
//               </div>

//               {/* Price */}
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Price <span className="text-meta-1">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   name="price"
//                   placeholder="Enter Price"
//                   value={inventoryFormData.price}
//                   onChange={handleInventoryChange}
//                   required
//                   min="0"
//                   step="0.01"
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                 />
//               </div>

//               {/* Supplier */}
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Supplier
//                 </label>
//                 <input
//                   type="text"
//                   name="supplier"
//                   placeholder="Enter Supplier"
//                   value={inventoryFormData.supplier}
//                   onChange={handleInventoryChange}
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                 />
//               </div>

//               {/* Return Date */}
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Return Date
//                 </label>
//                 <input
//                   type="date"
//                   name="returnDate"
//                   value={inventoryFormData.returnDate}
//                   onChange={handleInventoryChange}
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                 />
//               </div>

//               {/* Last Inspection Date */}
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Last Inspection Date
//                 </label>
//                 <input
//                   type="date"
//                   name="lastInspectionDate"
//                   value={inventoryFormData.lastInspectionDate}
//                   onChange={handleInventoryChange}
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                 />
//               </div>

//               {/* Maintenance Schedule */}
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Maintenance Schedule
//                 </label>
//                 <input
//                   type="text"
//                   name="maintenanceSchedule"
//                   placeholder="Enter Maintenance Schedule"
//                   value={inventoryFormData.maintenanceSchedule}
//                   onChange={handleInventoryChange}
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                 />
//               </div>

//               {/* Maintenance Charge */}
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Maintenance Charge
//                 </label>
//                 <input
//                   type="number"
//                   name="maintenanceCharge"
//                   placeholder="Enter Maintenance Charge"
//                   value={inventoryFormData.maintenanceCharge}
//                   onChange={handleInventoryChange}
//                   min="0"
//                   step="0.01"
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                 />
//               </div>

//               {/* Issued To */}
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Issued To
//                 </label>
//                 <input
//                   type="text"
//                   name="issuedTo"
//                   placeholder="Enter Name of Person or Unit"
//                   value={inventoryFormData.issuedTo}
//                   onChange={handleInventoryChange}
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                 />
//               </div>

//               {/* User ID */}
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   User ID
//                 </label>
//                 <input
//                   type="text"
//                   name="userId"
//                   placeholder="Enter User ID"
//                   value={inventoryFormData.userId}
//                   onChange={handleInventoryChange}
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                 />
//               </div>
//             </div>

//             <div className="col-span-full flex justify-end">
//                 <button
//                   type="submit"
//                   className="w-half mb-4 mr-4 rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
//                 >
//                   Add Inventory Item
//                 </button>
//               </div>
             
//           </form>
//         </div>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default AddInventory;
"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MultiSelect from "@/components/FormElements/MultiSelect";

interface InventoryFormData {
  itemId: string;
  category: string[];
  categoryDetails: Record<string, any>;
  type: string;
  description: string;
  quantity: number;
  location: string;
  condition: string;
  acquisitionDate: string;
  expiryDate: string;
  price: string;
  supplier: string;
  returnDate: string;
  lastInspectionDate: string;
  maintenanceSchedule: string;
  maintenanceCharge: string;
  issuedTo: string;
  userId: string;
}

const Modal = ({ show, onClose, children }: { show: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl overflow-auto max-h-[90vh] relative">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={onClose}>
          X
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

const AddInventory = () => {
  const [inventoryFormData, setInventoryFormData] = useState<InventoryFormData>({
    itemId: "",
    category: [],
    categoryDetails: {},
    type: "",
    description: "",
    quantity: 1,
    location: "",
    condition: "",
    acquisitionDate: "",
    expiryDate: "",
    price: "",
    supplier: "",
    returnDate: "",
    lastInspectionDate: "",
    maintenanceSchedule: "",
    maintenanceCharge: "",
    issuedTo: "",
    userId: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [categoryType, setCategoryType] = useState<string>("");

  const handleInventoryChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInventoryFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (selectedCategories: string[]) => {
    const selectedCategory = selectedCategories[0];
    setInventoryFormData({ ...inventoryFormData, category: selectedCategories });
    setCategoryType(selectedCategory);
    setShowModal(true);  // Trigger the modal to open
  };

  const handleCategoryFormSubmit = () => {
    setInventoryFormData((prev) => ({
      ...prev,
      categoryDetails: {
        ...prev.categoryDetails,
        [categoryType]: prev.categoryDetails[categoryType] || {},
      },
    }));
    setShowModal(false);  // Close the modal after submitting
  };

  const handleInventorySubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inventoryFormData),
      });

      if (response.ok) {
        alert("Inventory added successfully!");
        setInventoryFormData({
          itemId: "",
          category: [],
          categoryDetails: {},
          type: "",
          description: "",
          quantity: 1,
          location: "",
          condition: "",
          acquisitionDate: "",
          expiryDate: "",
          price: "",
          supplier: "",
          returnDate: "",
          lastInspectionDate: "",
          maintenanceSchedule: "",
          maintenanceCharge: "",
          issuedTo: "",
          userId: "",
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting inventory form:", error);
      alert("Failed to submit the inventory.");
    }
  };

  const renderCategoryForm = () => {
    switch (categoryType) {
      case "communicationDevice":
        return (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Inventory Item ID</label>
              <input
                type="text"
                placeholder="Enter inventory item ID"
                className="w-full border px-4 py-2"
                onChange={(e) => {
                  const updatedDetails = { ...inventoryFormData.categoryDetails };
                  updatedDetails[categoryType] = { ...updatedDetails[categoryType], itemId: e.target.value };
                  setInventoryFormData({ ...inventoryFormData, categoryDetails: updatedDetails });
                }}
              />
            </div>
            {/* Add more fields specific to communicationDevice as needed */}
            <button onClick={handleCategoryFormSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
              Submit
            </button>
          </div>
        );
      case "vehicleAndAccessories":
        return (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
              <input
                type="text"
                placeholder="Enter vehicle type"
                className="w-full border px-4 py-2"
                onChange={(e) => {
                  const updatedDetails = { ...inventoryFormData.categoryDetails };
                  updatedDetails[categoryType] = { ...updatedDetails[categoryType], vehicleType: e.target.value };
                  setInventoryFormData({ ...inventoryFormData, categoryDetails: updatedDetails });
                }}
              />
            </div>
            {/* Add more fields specific to vehicleAndAccessories as needed */}
            <button onClick={handleCategoryFormSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
              Submit
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Inventory Form" />

      <div className="bg-white p-6 shadow rounded">
        <form onSubmit={handleInventorySubmit}>
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Item ID</label>
              <input
                type="text"
                name="itemId"
                placeholder="Enter Item ID"
                value={inventoryFormData.itemId}
                onChange={handleInventoryChange}
                className="w-full border px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <MultiSelect
                id="category"
                options={[
                  "communicationDevice",
                  "computerAndITEquipment",
                  "networkingEquipment",
                  "surveillanceAndTracking",
                  "vehicleAndAccessories",
                  "protectiveGear",
                  "firearm",
                  "forensicEquipment",
                  "medicalFirstAid",
                  "officeSupply",
                ]}
                selectedOptions={inventoryFormData.category}
                onChange={handleCategoryChange}
              />
            </div>

            {/* Modal for category form */}
            <Modal show={showModal} onClose={() => setShowModal(false)}>
              {renderCategoryForm()}
            </Modal>

            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <input
                type="text"
                name="type"
                placeholder="Enter Type"
                value={inventoryFormData.type}
                onChange={handleInventoryChange}
                className="w-full border px-4 py-2"
                required
              />
            </div>

            {/* Add more general fields as needed */}

            <div className="flex justify-end">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default AddInventory;
