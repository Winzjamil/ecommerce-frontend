import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCartShopping } from 'react-icons/fa6';
import { handleCart } from '../features/cartSlice';
function CartConfirmation({ item, onClose }) {
  const user = useSelector((state) => state.user.user);

  const [size, setSize] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState('');
  const [stock, setStock] = useState(item.quantity - 1);
  const [unitPrice, setUnitPrice] = useState(item.price);

  const dispatch = useDispatch();

  const sizes = item.size.map((s) => s);

  const sizeHandle = (s) => {
    s ? setSize(s) : setSize(size);
  };

  const qHandle = (action) => {
    if (action === 'add') {
      if (stock === 1) {
        alert('sorry we are out of stock');
        setStock(0);
        return;
      }
      setQuantity((prev) => prev + 1);
      setStock((prev) => prev - 1);
      setUnitPrice(() => item.price * quantity + item.price);
    } else {
      if (quantity === 1) {
        return;
      }

      setQuantity((prev) => prev - 1 || 1);
      setStock((prev) => prev + 1 || 1);
      setUnitPrice((prev) => prev - item.price || item.price);
    }
  };

  const submitHandle = async () => {
    // const newImage = [item.image[0]];
    const updatedItem = {
      ...item,
      unitPrice: unitPrice,
      quantity: quantity,
      size: size,
      stock: stock,
      id: user.id,
    };

    if (updatedItem.size.length === 0) {
      alert('Please choose a size');
      return;
    }

    await dispatch(handleCart({ type: 'post', data: updatedItem })).unwrap();
    onClose();
    // setTimeout(() => {
    //   setShowMessage(false);
    // }, 5000);
  };

  return (
    <div className="bg-sky-800 p-4 flex flex-wrap gap-1">
      <div className=" bg-stone-600 p-2 rounded-md flex  flex-wrap border border-stone-400 w-full items-center  mt-1.5 ">
        <div className="flex flex-wrap">
          <div className="shadow-b-md flex flex-col  items-center ">
            <img
              src={item.image}
              alt={item.title}
              className="h-25 w-25 object-cover bg-white  rounded-md shadow-md  hover:border-y hover:border-y-blue-green-400 hover:border-x hover:border-x-red-600"
            />
            <p>{item.title}</p>
            <p className="text-orange-400 font-extralight">
              &#8369;{item.price}
            </p>
          </div>
          <div className=" flex   items-center justify-center p-1 gap-3">
            <div className="flex flex-wrap bg-white p-0.5  font-extralight items-center rounded-sm gap-2">
              <img
                src={item.storeProfile}
                alt="store name"
                className="h-10 w-10 object-cover  p-1 rounded border-b border-b-gray-300 shadow-md"
              />
              <p>{item.storeName}</p>
            </div>
            <p className="w-40 mx-auto text-sm text-white break-words">
              {item.description}
            </p>
          </div>
        </div>
        {sizes.map((s, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                setActiveIndex(i);
              }}
              className={
                activeIndex === i
                  ? 'border border-sky-200 bg-white  p-0.5 mr-0.5 flex items-center self-end '
                  : 'bg-transparent border border-white p-0.5 mr-0.5 flex items-center self-end'
              }
            >
              <button
                onClick={() => {
                  sizeHandle(s);
                }}
                className="bg-stone-400 rounded-md border border-white shadow-md px-1 py-0.5"
              >
                {s}
              </button>
            </div>
          );
        })}
        <div className="flex   bg-sky-200 items-center rounded-sm">
          <button
            className="px-5 cursor-pointer  hover:bg-blue-400 rounded-sm"
            onClick={(e) => {
              qHandle('sub');
              e.stopPropagation();
            }}
          >
            -
          </button>
          <p className="bg-white flex gap-4 items-center px-2">
            {quantity}
            <span className="text-orange-400 ">&#8369;{unitPrice}</span>
          </p>
          <button
            className="px-5 cursor-pointer hover:bg-blue-400 rounded-sm self-end"
            onClick={(e) => {
              qHandle('add');
              e.stopPropagation();
            }}
          >
            +
          </button>
        </div>
      </div>

      <div className="flex justify-center w-full">
        <button
          className="px-7 bg-sky-200  py-1 rounded-md  mr-4  shadow-md cursor-pointer "
          onClick={() => submitHandle()}
        >
          <FaCartShopping />
        </button>
      </div>
    </div>
  );
}

export default CartConfirmation;
