import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
function Carts() {
  const { carts, setCarts } = useContext(GlobalContext);
  const [subTotal, setSubTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const total = carts.reduce((acc, item) => {
      return Number(acc + Number(item.price));
    }, 0);
    setSubTotal(total);

    const totalItem = carts.reduce((sum, item) => {
      return (sum += item.itemQuantity);
    }, 0);
    setTotalItems(totalItem);
  }, [carts]);

  const updateQuantity = async (CartId, action) => {
    const cartData = [...carts];
    const cartItem = cartData.find((c) => c._id === CartId);
    if (!cartItem) {
      alert('cart item not found');
      return;
    }

    if (action === 'add') {
      cartItem.itemQuantity = (cartItem.itemQuantity || 1) + 1;
      cartItem.quantity = cartItem.quantity - 1;
    } else {
      cartItem.itemQuantity = (cartItem.itemQuantity || 1) - 1;
      cartItem.quantity = cartItem.quantity + 1;
    }

    if (cartItem.itemQuantity === 0) {
      const confirmRemove = window.confirm('are you sure to delete this');
      if (confirmRemove) {
        const updatedCart = cartData.filter((c) => c._id !== CartId);
        setCarts(updatedCart);
        // if confirmremove remove the data on data base
        await fetch(`http://localhost:8080/cart/${CartId}`, {
          method: 'DELETE',
        });
        return;
      } else {
        cartItem.itemQuantity = 1;
        cartItem.price = cartItem.unitPrice;
        cartItem.quantity -= 1;
      }
    }
    // to get the total price of item per quantity
    cartItem.price = cartItem.unitPrice * cartItem.itemQuantity;

    try {
      // update data on data base by using PUT method
      const response = await fetch(`http://localhost:8080/cart/${CartId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartItem),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart item');
      }
    } catch (err) {
      console.error('Error updating cart:', err.message);
    }
    setCarts(cartData);
  };

  return (
    <div className="bg-green-300 p-4 ">
      {carts.length === 0 ? (
        <div className="bg-white text-center p-2">
          <p>Your cart is empty.</p>
          <div>
            <Link to="/">BROWSE</Link>
          </div>
        </div>
      ) : (
        <ul>
          <div>
            <Link to="/" className="text-white">
              <FaArrowLeft />
            </Link>
          </div>

          {carts &&
            carts.map((item) => (
              <li
                key={item._id}
                className="bg-white shadow-md p-2.5 flex flex-wrap items-center gap-12 mt-3.5"
              >
                <div>
                  <input type="checkbox" />
                </div>
                <div className=" p-1 w-36 h-auto shadow-md flex flex-col gap-1 rounded-md items-center">
                  <div className="h-auto bg-white rounded-md p-2.5">
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
                  <p className="font-bold"> Stock: {item.quantity}</p>
                </div>

                <div style={{ color: 'red' }}>&#8369;{item.price}</div>

                <div className="flex flex-wrap justify-center items-center  w-fit gap-4 shadow-md">
                  <button
                    onClick={() => updateQuantity(item._id, 'minus')}
                    className="cursor-pointer w-18 p-1"
                  >
                    -
                  </button>
                  {item.itemQuantity}
                  <button
                    onClick={() => updateQuantity(item._id, 'add')}
                    disabled={item.quantity === 0}
                    className={`w-18 p-1 ${
                      item.quantity === 0
                        ? 'text-red-500 opacity-50 cursor-not-allowed'
                        : 'text-black'
                    }`}
                  >
                    +
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
