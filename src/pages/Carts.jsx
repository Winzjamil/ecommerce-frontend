import ProductList from './ProductList';
import { useEffect, useState } from 'react';
import { handleCart } from '../features/cartSlice';
import CartCard from '../components/Cards/CartCard';
import { useSelector, useDispatch } from 'react-redux';

function Carts() {
  const carts = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.product.items);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [subTotal, setSubTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [itemCheck, setItemCheck] = useState([]);

  console.log('chck', itemCheck);
  const updateQuanHandle = async (action, cartId) => {
    const item = carts.find((cart) => cart._id === cartId);

    if (!item) {
      alert('no item found');
      return;
    }
    const updatedItem = { ...item };

    if (action === 'add') {
      if (updatedItem.stock === 0) {
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
        await dispatch(
          handleCart({ type: 'del', data: updatedItem, id: updatedItem._id })
        );
      } else {
        return;
      }
    }

    await dispatch(
      handleCart({ type: 'update', data: updatedItem, id: updatedItem._id })
    );
  };

  useEffect(() => {
    dispatch(handleCart({ type: 'fetch', id: user.id }));
  }, [dispatch]);
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
    await dispatch(handleCart({ type: 'del', id: id }));
  };
  const handleChange = (id) => {
    setItemCheck((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };
  const orderHandle = () => {
    alert('heyy its mee order handle');
  };
  return (
    <div className="bg-black/80 pt-20 min-h-screen ">
      {carts?.length <= 0 ? (
        <div className="bg-white text-center p-2">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <>
          {carts.map((item, i) => (
            <div key={i} className="p-1">
              <div className="">
                <input
                  type="checkbox"
                  checked={itemCheck.includes(item._id)}
                  onChange={() => handleChange(item._id)}
                />
              </div>
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

          <div className=" mt-2 p-1 flex font-extralight flex-wrap justify-end items-center ">
            <div className=" items-center p-2 justify-center bg-stone-500 gap-2 flex flex-wrap border border-white rounded-md">
              <p className="bg-black text-white py-4 px-1"> Subtotal</p>
              <div className="flex flex-wrap bg-white p-2 items-center border border-black/80 ">
                <span className=" px-1"> Items</span>
                <span className=" px-2 ">{totalItems}</span>
              </div>
              <span>=</span>
              <span className="bg-white p-2  border border-black/80 shadow-md text-green-600">
                &#8369;{subTotal}{' '}
              </span>
              <div className="w-full flex justify-center mt-4">
                <button
                  className="bg-blue-700 text-white px-4  border-b border-b-white rounded-2xl cursor-pointer"
                  onClick={() => orderHandle()}
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div>
        <ProductList />
      </div>
    </div>
  );
}

export default Carts;
