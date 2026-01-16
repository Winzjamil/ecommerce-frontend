import {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartItemMutation,
  useFetchAddressQuery,
  useAddOrderMutation,
} from '../features/shop/shopApi';
import ProductList from './ProductList';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paymentMethods, routes } from '../enums';
import CartCard from '../components/Cards/CartCard';

function Carts() {
  const { data: carts = [] } = useGetCartQuery();
  console.log('carts', carts);
  const { data: address = [] } = useFetchAddressQuery();
  const [subTotal, setSubTotal] = useState(0);
  const [remove] = useRemoveFromCartMutation();
  const [update] = useUpdateCartItemMutation();
  const [placeOrder] = useAddOrderMutation();
  const [itemCheck, setItemCheck] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const navigate = useNavigate();
  const updateQuanHandle = async (action, cartId) => {
    const item = carts.find((cart) => cart._id === cartId);
    if (!item) {
      alert('no item found');
      return;
    }
    const updatedItem = { ...item };
    if (action === 'add') {
      if (updatedItem.stock <= 0) {
        alert('sorry we are out of stock');
        return;
      }
      updatedItem.quantity = item.quantity + 1;
      updatedItem.stock = item.stock - 1;
      updatedItem.unitPrice = item.unitPrice + item.price;
    } else {
      updatedItem.quantity = item.quantity - 1;
      updatedItem.stock = item.stock + 1;
      updatedItem.unitPrice = item.unitPrice - item.price;
    }
    if (updatedItem.quantity === 0) {
      const confirmDel = window.confirm(
        'Are you sure  to remove this item from your cart?'
      );

      if (confirmDel) {
        remove(cartId);
      } else {
        updatedItem.quantity = 1;
        updatedItem.unitPrice = item.unitPrice;
      }
    }

    try {
      await update({
        id: cartId,
        updatedData: updatedItem,
      }).unwrap();
    } catch (err) {
      console.error('failed to update cart item', err.data.message || err);
    }
  };
  // to get  sub total price
  useEffect(() => {
    const total = carts.reduce((acc, item) => {
      return acc + Number(item.unitPrice);
    }, 0);
    setSubTotal(total);

    const totalItem = carts.reduce((sum, item) => {
      return (sum += Number(item.quantity));
    }, 0);
    setTotalItems(totalItem);
  }, [carts]);

  const deleteHandle = async (id) => {
    const item = [...carts].find((c) => c._id === id);
    if (!item) {
      alert('no item found');
      return;
    }
    const confirmDel = window.confirm('are you sure to remove this item');
    if (!confirmDel) {
      return;
    }
    remove(id);
  };

  const handleChange = (id) => {
    setItemCheck((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const orderHandle = async () => {
    const selectedItems = carts.filter((cart) => itemCheck.includes(cart._id));

    if (selectedItems.length <= 0) {
      alert('Please select items to order');
      return;
    }

    const defaultAddress = address.find((add) => add.isDefault === true);
    if (!defaultAddress) {
      alert('please choose shipping address');

      navigate(routes.ADDRESS);
      return;
    }
    const orderPayload = {
      items: selectedItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        image: item.image,
      })),
      paymentMethod: paymentMethod,
      shippingAddress: defaultAddress,
    };

    try {
      await placeOrder(orderPayload).unwrap();
      alert('Order placed successfully!');

      carts.filter(
        (cart) => cart._id !== selectedItems.map((item) => item._id)
      );

      setItemCheck([]);
      navigate(routes.DASH_BOARD);
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || 'Failed to place order');
    }
  };

  return (
    <div className="bg-black/80 pt-20 min-h-screen flex flex-wrap items-center ">
      {carts?.length <= 0 ? (
        <div className="bg-white flex w-full items-center justify-center text-center p-2 h-screen">
          <p className="text-xl">No items yet!!</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 items-center justify-center w-full  ">
          {carts?.map((item, i) => (
            <div key={i}>
              <input
                type="checkbox"
                checked={itemCheck?.includes(item._id)}
                onChange={() => handleChange(item._id)}
                className="absolute translate-y-0.5 h-4 w-4  border-none outline-none accent-green-300"
              />
              <CartCard
                img={item.image}
                name={item.title}
                price={item.price}
                quantity={item.quantity}
                discrep={item.description}
                size={item.size}
                unitPrice={item.unitPrice}
                storeName={item.storeName}
                sImg={item.storeProfile}
                sub={(e) => {
                  updateQuanHandle('subtract', item._id);
                  e.stopPropagation();
                }}
                add={(e) => {
                  updateQuanHandle('add', item._id);
                  e.stopPropagation();
                }}
                del={() => deleteHandle(item._id)}
              />
            </div>
          ))}

          <div className="w-full mt-2  flex items-center justify-between font-extralight flex-wrap  items-center bg-green-400 rounded-r ">
            <div className="flex gap-2 flex-wrap">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center justify-between p-2 border ml-2 rounded  cursor-pointer transition
                      ${
                        paymentMethod === method.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }
                                 `}
                >
                  <div>
                    <p className="font-medium">{method.label}</p>
                    <p className="text-sm text-gray-500">{method.desc}</p>
                  </div>

                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                    className="accent-green-600"
                  />
                </label>
              ))}
            </div>

            <div className=" items-center p-2 justify-center gap-2 rounded-t bg-stone-500 flex flex-wrap border border-white ">
              <span className="bg-black text-white py-4 px-1"> Subtotal</span>
              <div className="flex flex-wrap px-4 py-3 gap-2 items-center bg-black/50  border border-stone-500 rounded ">
                <span> Items</span>
                <span>{totalItems}</span>
                <span>=</span>
                <span className="text-green-300">&#8369;{subTotal} </span>
              </div>
              <div className="w-full flex justify-center text-sm text-white font-light mt-4">
                <button
                  className="bg-blue-700 text-white px-4 py-0.5  border-b border-b-white rounded cursor-pointer"
                  onClick={() => orderHandle()}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full">
        <ProductList />
      </div>
    </div>
  );
}

export default Carts;
