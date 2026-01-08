function OrderItem({ isVisible, orders }) {
  return (
    <div className="flex flex-col w-full gap-4">
      {orders?.map((order) => (
        <div key={order._id} className="w-full bg-black p-2 rounded">
          {/* SHIPPING ADDRESS */}
          <div className="bg-white text-xs p-2 mb-2 flex items-center justify-between rounded">
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-700 mb-1">Receiver</h2>
              <p className="flex gap-2 items-center">
                <span> {order.shippingAddress.fullName}</span>
                <span className="bg-green-200">
                  {order.shippingAddress.phone}
                </span>
              </p>

              <div className="flex flex-col">
                <span>{order.shippingAddress.region}</span>
                <p>
                  <span>{order.shippingAddress.barangay}</span>
                  <span>{order.shippingAddress.city}</span>
                  <span> {order.shippingAddress.province} </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col self-start">
              <h2 className="font-semibold text-gray-700">
                Total =
                <span className="p-1 bg-black/20 text-green-500 ml-1">
                  ₱{order.totalPrice}
                </span>
              </h2>
            </div>

            {/* <p>{order.shippingAddress.region}</p> */}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {order.items.map((item) => (
              <div
                key={item._id}
                className="p-1 w-full max-w-[20%] flex flex-col gap-2 bg-gray-300 text-xs rounded"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-32 object-cover rounded"
                />

                <p className="text-center font-semibold">{item.title}</p>

                <div className="flex justify-center text-black/60">
                  <p className="bg-yellow-300/40 p-1 border">₱{item.price}</p>
                  <p className="bg-yellow-300/40 p-1 border">{item.quantity}</p>
                </div>

                {isVisible && (
                  <button className="bg-orange-400 text-white px-2 py-1 rounded">
                    Cancel
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderItem;
