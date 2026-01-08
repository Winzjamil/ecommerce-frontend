import React from 'react';
import img1 from '../../assets/img1.jpg';
import { FaTrash } from 'react-icons/fa';
import { FaPlus, FaMinus } from 'react-icons/fa6';
function CartCard({
  img,
  name,
  price,
  quantity,
  discrep,
  size,
  unitPrice,
  storeName,
  sImg,
  sub,
  add,
  del,
}) {
  return (
    <div className=" bg-sky-200/70 rounded flex w-full h-80 max-w-50 flex-wrap items-center shadow-md justify-center gap-2   ">
      <div className="shadow-b-md flex flex-col items-center gap-1 p-1  ">
        <img
          src={img}
          alt={name}
          className="h-25 w-50  object-fit rounded border-b border-b-sky-700 "
        />
        <span className="font-extralight text-sm">{name}</span>
        <span className="text-green-300 font-extralight"> &#8369;{price}</span>
      </div>

      <p className=" w-full max-w-40 mx-auto font-light text-stone-500 text-xs break-words">
        {discrep}
      </p>
      <div className=" flex  flex-wrap items-center text-xs p-1  text-white rounded-full gap-2">
        <img
          src={sImg}
          alt={storeName}
          className="h-7 w-7 object-cover  rounded-full border "
        />
        <span>{storeName}</span>
      </div>
      <span className="px-1.5 py-1 bg-gray-300  rounded-md  text-sm border border-sky-300">
        {size}
      </span>

      <div className="flex  w-full bg-stone-300 items-center ">
        <button
          className="px-5 cursor-pointer py-1 hover:bg-blue-400 rounded-r  "
          onClick={sub}
        >
          -
        </button>
        <div className="bg-white/60 w-full py-1 flex gap-4 items-center px-2">
          {quantity}
          <span className="text-orange-400 ">&#8369;{unitPrice}</span>
        </div>
        <button
          className="px-5 py-1 cursor-pointer hover:bg-blue-400 rounded-l "
          onClick={add}
        >
          +
        </button>
      </div>
      <button
        className="px-7 py-1 rounded-md text-white mr-4 bg-white shadow-md cursor-pointer"
        onClick={del}
      >
        <FaTrash className="text-xl text-red-400 hover:text-red-600 hover:animate-spin " />
      </button>
    </div>
  );
}

export default CartCard;
