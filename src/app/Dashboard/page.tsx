
import React from 'react'
import MonthlyReport from './dash';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

const page = () => {
  return (
    <>
      <Breadcrumb pageName="Dashboard" />
      <MonthlyReport />
    </>
    
  );
}

export default page
