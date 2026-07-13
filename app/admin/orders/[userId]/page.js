 import OrderDetail from '@/Components/OrderDetail';

import React from 'react';

const page = async({params}) => {
  const { userId } = await params;
  return (
    <div>
      <OrderDetail userId={userId}/>

    </div>
  );
}

export default page;
