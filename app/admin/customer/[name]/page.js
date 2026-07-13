 import CustomerDetail from '@/Components/CustomerDetail';

import React from 'react';

const page = async({params}) => {
  const { name } = await params;
  return (
    <div>
            <CustomerDetail name={name}/>

    </div>
  );
}

export default page;
