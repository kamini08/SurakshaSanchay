import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
// import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import GoogleTranslate from "../Translater";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white p-4 drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between p-4 px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`delay-[0] relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!delay-[0] !h-0"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          {/* <Link className="block flex-shrink-0 lg:hidden" href="/"> */}
          {/* <Image
              width={32}
              height={32}
              src={"/images/logo/logo-icon.svg"}
              alt="Logo"
            /> */}
          {/* </Link> */}
        </div>

        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
                {/* <svg
                  className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                    fill=""
                  />
                </svg> */}
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            {/* <DropdownMessage /> */}
            {/* <!-- Chat Notification Area --> */}
          </ul>
          <GoogleTranslate />

          {/* <!-- User Area --> */}
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
// import DropdownNotification from "./DropdownNotification";
// import DropdownUser from "./DropdownUser";
// import DarkModeSwitcher from "./DarkModeSwitcher";

// const Header = () => {
//   return (
//     <div className="flex items-center justify-between px-4 py-2">
//       {/* Left Section */}
//       <div className="flex items-center">
//         <h1 className="text-lg font-bold ">SurakshaSanchay</h1>
//         <div className="flex items-center">
//         <svg
//     version="1.1"
//     id="Layer_1"
//     xmlns="http://www.w3.org/2000/svg"
//     xmlnsXlink="http://www.w3.org/1999/xlink"
//     x="0px"
//     y="0px"
//     viewBox="0 0 122.88 105.69"
//     style={{ width: '10%', height: '10%' }}
//     enableBackground="new 0 0 122.88 105.69"
//   >
//     <style type="text/css">{`
//       .st0 {
//         fill-rule:evenodd;
//         clip-rule:evenodd;
//       }
//     `}</style>
//     <g>
//       <path
//         className="st0"
//         d="M61.44,24.71c-10.31,0.23-20.99,1.19-29.91,3.02l-0.01-0.04C27.45,8.51,44.29-0.03,61.44,0 c17.15-0.03,34,8.51,29.92,27.7l-0.01,0.04C82.43,25.9,71.75,24.95,61.44,24.71L61.44,24.71z M60.82,9.41l1.6,3.92l4.23,0.31 l-3.23,2.74l1.01,4.12l-3.6-2.23l-3.6,2.23l1.01-4.12l-3.23-2.74l4.23-0.31L60.82,9.41L60.82,9.41z M17.55,92.4h16.11 c0.38,0,0.69,0.31,0.69,0.69v3.72c0,0.38-0.31,0.69-0.69,0.69H17.55c-0.38,0-0.69-0.31-0.69-0.69v-3.72 C16.86,92.71,17.17,92.4,17.55,92.4L17.55,92.4L17.55,92.4z M73.53,64.48c-4.3,2.87-6.93,4.45-12.5,4.31 c-5.42-0.08-8.25-1.91-12.58-4.65C48.12,82.23,73.98,83.3,73.53,64.48L73.53,64.48z M79.98,51.36c0.23-0.8,0.5-1.64,0.8-2.63 c0.11-0.42,0.53-0.72,0.95-0.65c1.26,0.23,2.52-1.6,3.39-3.81c0.5-1.33,0.88-2.78,0.99-4.08c0.12-1.22,0-2.29-0.34-2.94 c-0.34-0.63-1.28-0.26-1.98-0.88c-3.61,9.58-35.12,13.92-48.01,0.72c-0.46,0.73-0.53,2.02-0.38,3.47c0.19,1.53,0.65,3.2,1.34,4.54 c0.8,1.56,1.83,2.63,2.86,2.36c0.42-0.11,0.88,0.11,1.03,0.53c0.3,0.84,0.5,1.49,0.72,2.14C48.04,69.75,73.43,71.29,79.98,51.36 L79.98,51.36L79.98,51.36z M122.88,105.69l-0.72-2.76c-8.2-36.03-27.92-21.7-45-33.68c-0.26-0.23-0.52-0.46-0.77-0.7l-0.21-4.88 c3.09-3.23,6.63-9.1,8.06-13.38c1.77,0,3.29-1.48,4.36-3.58c0.82-1.64,1.4-3.62,1.6-5.51c0.21-1.93,0.04-3.74-0.66-4.89l0.91-4.36 c-8.62-1.78-18.99-2.71-29.03-2.94c-10.03,0.23-20.4,1.16-29.03,2.94l0.91,4.36c-0.7,1.15-0.86,2.96-0.66,4.89 c0.21,1.89,0.78,3.87,1.6,5.51c1.07,2.1,2.59,3.58,4.36,3.58c0.16,0.49,0.37,1.03,0.54,1.56c1.97,5.24,3.51,8.35,7.53,12.13 l-0.21,4.56c-0.25,0.24-0.5,0.47-0.77,0.7c-17.08,11.98-36.8-2.35-45,33.68L0,105.69H122.88L122.88,105.69z"
//       />
//     </g>
//   </svg>
//  </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center gap-4 marker:text-transparent">
//         <DarkModeSwitcher />
//         <DropdownNotification />
//         <DropdownUser />
//       </div>
//     </div>
//   );
// };

// export default Header;
