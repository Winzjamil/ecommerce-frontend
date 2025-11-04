import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { handleCart } from '../features/cartSlice';

function Carts() {
  const { items: carts } = useSelector((state) => state.cart);
  console.log('carts', carts);
  const dispatch = useDispatch();
  const [subTotal, setSubTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const updateQuanHandle = (action, cartId) => {
    const item = carts.find((cart) => cart._id === cartId);
    const newQuantity =
      action === 'add' ? item.quantity + 1 : item.quantity - 1;

    if (newQuantity === 0) {
      const confirmDelete = window.confirm(
        'Are you sure  to remove this item from your cart?'
      );
      if (!confirmDelete) return;
    }
    dispatch(handleCart({ type: 'update', action, id: cartId }));
  };

  useEffect(() => {
    dispatch(handleCart({ type: 'fetch' }));
  }, [dispatch]);

  useEffect(() => {
    const total =
      Array.isArray(carts) &&
      carts.reduce((acc, item) => {
        return Number(acc + Number(item.price));
      }, 0);
    setSubTotal(total);

    const totalItem =
      Array.isArray(carts) &&
      carts.reduce((sum, item) => {
        return Number((sum += Number(item.quantity)));
      }, 0);
    setTotalItems(totalItem);
  }, [carts]);

  return (
    <div className="bg-green-300 p-4 ">
      {Array.isArray(carts) && carts.length <= 0 ? (
        <div className="bg-white text-center p-2">
          <p>Your cart is empty.</p>
          <div>
            <Link to="/">BROWSE</Link>
          </div>
        </div>
      ) : (
        <ul>
          <div className="bg-blue-400">
            <Link to="/" className="text-white">
              <FaArrowLeft />
            </Link>
          </div>

          {Array.isArray(carts) &&
            carts.map((item) => (
              <li
                key={item._id}
                className="bg-white shadow-md p-2.5 flex  items-center gap-12 mt-3.5"
              >
                <div>
                  <input type="checkbox" />
                </div>
                <div className=" p-1 w-36 h-auto shadow-md flex flex-col gap-1 rounded-md items-center">
                  <div className="h-auto bg-white rounded-md border border-1 border-color-blue-400 p-2.5">
                    <img src={item.image} alt={item.title} className=" h-22" />
                  </div>
                  <div>
                    {item.title} -
                    <span className="text-green-400">
                      &#8369;{item.unitPrice}
                    </span>
                  </div>
                </div>

                <div className="w-96 break-words p-2 flex flex-col gap-4">
                  <p className="p-2 shadow-md text-center">
                    {item.description}
                  </p>
                  <p className="font-bold"> Stock: {item.stock}</p>
                </div>

                <div style={{ color: 'red' }}>&#8369;{item.price} </div>

                <div className="flex flex-wrap justify-center items-center bg-red-600  w-fit gap-4 shadow-md">
                  <button
                    onClick={() => updateQuanHandle('add', item._id)}
                    disabled={item.quantity === 0}
                    className={`w-18 p-1 ${
                      item.quantity === 0
                        ? 'text-red-500 opacity-50 cursor-not-allowed'
                        : 'text-black'
                    }`}
                  >
                    +
                  </button>
                  {item.quantity}
                  <button
                    onClick={() => updateQuanHandle('decrease', item._id)}
                    className="cursor-pointer w-18 p-1"
                  >
                    -
                  </button>
                </div>
              </li>
            ))}
          <div className="bg-white mt-2 justify-center items-center p-2 w-full max-w-72 rounded-md gap-2 flex">
            Subtotal
            <span className="font-bold">
              ( Items : {totalItems} )=
              <span className="text-red-600">&#8369;{subTotal} </span>
            </span>
          </div>

          <div className="text-end mt-2">
            <button
              className="bg-red-600 text-white p-2 rounded-md"
              onClick={() => alert()}
            >
              Place Order
            </button>
          </div>
        </ul>
      )}
    </div>
  );
}

export default Carts;
