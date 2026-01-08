import { useState } from 'react';
import OrderItem from '../../../components/Cards/OrderItem';
import { header } from '../../../enums';
import { useGetOrderQuery } from '../../../features/shop/shopApi';

function Orders() {
  const [clickStatus, setClickStatus] = useState(null);
  const { data: orders = [] } = useGetOrderQuery();

  console.log('orders', orders);
  // const orderItem = [...orders].flatMap((item) => item.items);
  // console.log('orderItem', orderItem);

  const showOrders = (status) => {
    setClickStatus(status);
  };
  return (
    <div className="w-full flex-col gap-2 pt-4 bg-gray-300 h-screen">
      <div className="flex justify-evenly items-center w-full text-white text-sm shadow pb-1 mb-2 ">
        {header.map((h) => (
          <button
            onClick={() => showOrders(h)}
            key={h}
            className={
              h === clickStatus
                ? '  bg-green-400 rounded px-2 cursor-pointer'
                : ' bg-indigo-400 rounded px-2 cursor-pointer hover:bg-black/60'
            }
          >
            {h}
          </button>
        ))}
      </div>
      <OrderItem orders={orders} />
    </div>
  );
}

export default Orders;
