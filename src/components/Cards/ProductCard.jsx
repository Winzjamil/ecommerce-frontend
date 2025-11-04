import { FaCartShopping } from 'react-icons/fa6';

function Card({ image, title, price, description, cartHandler, stock }) {
  return (
    <div className="flex flex-wrap justify-center items-center rounded-md p-2.5 bg-white max-w-38   transition-transform duration-300 ease-in-out hover:translate-y-1">
      <div className="h-auto shadow-md border border-1 border-color-blue-400 rounded-md p-2.5">
        <img src={image} alt={title} className="  h-20" />
      </div>
      <div className="flex flex-wrap flex-col justify-center items-center w-full mt-2.5  gap-2">
        <h2>{title}</h2>
        <p className=" max-w-full whitespace-nowrap overflow-hidden text-ellipsis break-words">
          {description}
        </p>
        <p className="text-green-400">&#8369;{price}</p>
        <p>{stock}</p>
      </div>

      <button
        className="border-none  rounded-sm p-2 cursor-pointer bg-black text-white "
        onClick={cartHandler}
      >
        <FaCartShopping className="text-xl" />
      </button>
    </div>
  );
}

export default Card;
