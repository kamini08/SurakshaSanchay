import React from 'react';

interface CardDataStatsProps {
  statusCounts: { [key: string]: number }; // Add statusCounts prop
  onClick?: () => void;
  children?: React.ReactNode;
  icon?: string; // Add an optional icon prop
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  statusCounts,
  onClick,
  children,
  icon, // Destructure icon from props
}) => {
  return (
    <div
      className="min-h-[4rem] p-10 pt-10 rounded shadow-md relative bg-white shadow-default dark:border-strokedark dark:bg-boxdark" // Change background color to match charts
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {icon && (
        <div className="absolute  scale-75 mt-5 mb-5 top-2 left-20 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center bg-gray-300 rounded-full p-3 md:p-4 lg:p-5"> {/* Responsive icon */}
          <img src={icon} alt="" className="object-contain" /> {/* Icon within the circle */}
        </div>
      )}
      <div className=" break-words  mt-10 pt-15">
        {Object.entries(statusCounts).map(([status, count]) => (
          <p key={status.replace(/_/g, " ")}>
            {status}: {count} {/* Display the count for each status */}
          </p>
        ))}
      </div>
      {children}
    </div>
  );
};

export default CardDataStats;
