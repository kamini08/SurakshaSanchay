import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'
import MonthlyReport from './dash';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Dashboard" />
      <MonthlyReport />
    </DefaultLayout>
  );
}

export default page
