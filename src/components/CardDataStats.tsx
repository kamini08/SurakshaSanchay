import React from 'react';

interface CardDataStatsProps {
  title: string;
  statusCounts: { [key: string]: number }; // Add statusCounts prop
  onClick?: () => void;
  children?: React.ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  statusCounts, // Destructure statusCounts from props
  onClick,
  children,
}) => {
  return (
    <div
      className="bg-gray-200 min-h-[4rem] p-4 rounded shadow-md" // Add your desired styles
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <h3>{title}</h3>
      {Object.entries(statusCounts).map(([status, count]) => (
        <p key={status}>
          {status}: {count} {/* Display the count for each status */}
        </p>
      ))}
      {children}
    </div>
  );
};

export default CardDataStats;