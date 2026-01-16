import { useState } from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import { useAddToCartMutation } from '../features/shop/shopApi';
import { getAuthData } from '../enums';
import { useNavigate } from 'react-router-dom';
import { routes } from '../enums';
function CartConfirmation({ item, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [stock, setStock] = useState(item.quantity - 1);
  const [unitPrice, setUnitPrice] = useState(item.price);
  const [addToCart] = useAddToCartMutation();
  const user = getAuthData('user');
  const navigate = useNavigate();

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
    const updatedItem = {
      unitPrice: unitPrice,
      quantity: quantity,
      size: selectedSize,
      stock: stock,
      image: item.images[0],
      category: item.category,
      discreption: item.discreption,
      price: item.price,
      productId: item._id,
      title: item.title,
    };

    if (!updatedItem.size) {
      alert('Please choose a size');
      return;
    }

    if (!user) {
      alert('please logging in to add item to cart');
      navigate(routes.LOGIN);
      return;
    }

    try {
      await addToCart(updatedItem).unwrap();
      onClose();
    } catch (err) {
      console.error(`Failed to add to cart`, err);
    }

    // setTimeout(() => {
    //   setShowMessage(false);
    // }, 5000);
  };

  return (
    <div className="w-full flex justify-center items-center text-xs font-light flex-col gap-2 ">
      <div className=" bg-stone-600  rounded-md flex gap-2 flex-col w-full max-w-80  items-center justify-center   mt-2  ">
        <div className="flex flex-col gap-1 items-center text-sm p-1 w-full  ">
          <img
            src={item.images[0]}
            alt={item.title}
            className="h-25 w-25 object-cover  rounded shadow p-0.5 "
          />
          <span className="text-white">{item.title}</span>
          <span className="text-orange-400 font-extralight">
            &#8369;{item.price}
          </span>
          <p className="w-40 mx-auto text-xs font-extralight text-white break-words">
            {item.description}
          </p>
          <div className=" absolute right-[39%] flex  h-10 w-full items-center max-w-20 top-[35%] gap-2  justify-center rounded-full ">
            <img
              src={item.storeProfile}
              alt="store name"
              className="h-7 w-7 object-cover rounded-full bg-sky-200 p-0.5 "
            />
            <span className="text-xs text-black ">{item.storeName}</span>
          </div>
        </div>

        <div className="flex gap-2 text-xs bg-black p-1 flex-wrap text-white">
          {item.size.flatMap((s) =>
            s.split(',').map((size) => (
              <button
                onClick={() => setSelectedSize(size)}
                key={size}
                className={
                  selectedSize === size
                    ? 'text-white bg-blue-500 rounded cursor-pointer border border-white shadow-md  p-0.5'
                    : 'bg-stone-400 rounded cursor-pointer border border-white shadow-md  p-0.5'
                }
              >
                {size}
              </button>
            ))
          )}
        </div>

        <div className="flex flex-wrap w-full bg-slate-500 rounded-b items-center text-white justify-center ">
          <button
            className="px-5 cursor-pointer  py-1 hover:bg-blue-400 rounded-l-sm"
            onClick={(e) => {
              qHandle('sub');
              e.stopPropagation();
            }}
          >
            -
          </button>
          <div className="bg-white flex gap-4 py-1 items-center px-2">
            <span className="text-black">{quantity}</span>
            <span className="text-orange-400 ">&#8369;{unitPrice}</span>
          </div>
          <button
            className="px-5 cursor-pointer py-1 hover:bg-blue-400 rounded-r-sm self-end"
            onClick={(e) => {
              qHandle('add');
              e.stopPropagation();
            }}
          >
            +
          </button>
        </div>
      </div>

      <div className="flex justify-center w-full text-sm text-gray-700 ">
        <button
          className="px-5 bg-white  py-1 rounded border-b-2  flex items-center gap-1 shadow-md cursor-pointer "
          onClick={() => submitHandle()}
        >
          Submit
          <FaCartShopping />
        </button>
      </div>
    </div>
  );
}

export default CartConfirmation;
