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
      className=" min-h-[4rem] p-10  pt-10 rounded shadow-md relative bg-white shadow-default dark:border-strokedark dark:bg-boxdark" // Change background color to match charts
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {icon && (
        <div className="absolute mt-5 mb-5 top-2 left-24 w-1/4 h-15 flex items-center justify-center bg-gray-300 rounded-full p-5"> {/* Grey circle */}
          <img src={icon} alt={""} className="object-contain" /> {/* Icon within the circle */}
        </div>
      )}
      <div className='pt-15'>      {Object.entries(statusCounts).map(([status, count]) => (
        <p key={status}>
          {status}: {count} {/* Display the count for each status */}
        </p>
      ))}
      </div>
      {children}
    </div>
  );
};

export default CardDataStats;