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
    <div className=" bg-sky-200/70 rounded-md flex justify-between flex-wrap items-center pr-2 gap-3  ">
      <div className=" p-0.5 shadow-md flex bg-white/30 rounded-md gap-2 items-center">
        <div className="shadow-b-md flex flex-col items-center gap-1 w-21 p-1">
          <img
            src={img}
            alt="helllo"
            className="h-20 w-20 object-fit  rounded-md shadow-md border-b border-b-sky-200 "
          />
          <p className="font-extralight text-md">{name}</p>
          <p className="text-orange-400 font-extralight"> &#8369;{price}</p>
        </div>
        <div className=" flex flex-col  items-center p-1  gap-3">
          <div className="flex flex-wrap bg-sky-200 p-1 font-extralight text-white rounded-sm gap-2">
            <img
              src={sImg}
              alt={storeName}
              className="h-7 w-7 object-cover  rounded border shadow-md"
            />
            <p>{storeName}</p>
          </div>
          <p className="w-40 mx-auto text-sm break-words">{discrep}</p>
          <p className="px-1.5 py-1 bg-white text-sky-200 rounded-md  font-semibold">
            {size}
          </p>
        </div>
      </div>

      <div className="flex   bg-sky-200 items-center rounded-sm">
        <button
          className="px-5 cursor-pointer py-1 hover:bg-blue-400 rounded-sm  "
          onClick={sub}
        >
          -
        </button>
        <div className="bg-white  py-1 flex gap-4 items-center px-2">
          {quantity}
          <span className="text-orange-400 ">&#8369;{unitPrice}</span>
        </div>
        <button
          className="px-5 py-1 cursor-pointer hover:bg-blue-400 rounded-sm "
          onClick={add}
        >
          +
        </button>
      </div>
      <button
        className="px-7 py-1 rounded-md text-white mr-4 bg-white shadow-md cursor-pointer"
        onClick={del}
      >
        <FaTrash className="text-xl text-red-400 hover:text-red-600 hover:animate-bounce " />
      </button>
    </div>
  );
}

export default CartCard;
