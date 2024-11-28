"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import CardDataStats from "../CardDataStats";
import LineChart from "@/components/charts/ChartTwo";
import PieChart from "@/components/charts/ChartOne";
import Modal from "react-modal";

function MonthlyReport() {
  const [modalTitle, setModalTitle] = useState<string | null>(null);

  const openModal = (title: string) => {
    setModalTitle(title);
  };

  const closeModal = () => {
    setModalTitle(null);
  };

  const cardTitles = [
    "Forensic",
    "Firearms",
    "Protective",
    "Vehicles",
    "Monitoring",
    "Net Equipment",
    "IT Equipment",
    "Comm. Devices",
    "Office Supplies",
    "Medical"
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {cardTitles.map((title, index) => (
          <CardDataStats
            key={index}
            title={title}
            total={`${(index + 1) * 100}`} // Correctly calculate total values
            rate={`${(index + 1) * 0.5}%`} // Example rate values
            levelUp
            onClick={() => openModal(title)} // This should now work
          />
        ))}
      </div>

      <Modal
        isOpen={modalTitle !== null}
        onRequestClose={closeModal}
        contentLabel="Card Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <h2>{modalTitle}</h2>
        <p>Details about {modalTitle}...</p>
        <button onClick={closeModal}>Close</button>
      </Modal>

      <div className="flex space-x-5">
        <div className="min-w-150 bg border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mt-10">
          <LineChart />
        </div>
        <div className="min-w-150 bg border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mt-10">
          <PieChart />
        </div>
      </div>
    </>
  );
}

export default MonthlyReport;