import { FaCartShopping } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

function Card({ image, title, price, description, cartHandler, stock }) {
  return (
    <div className="flex flex-wrap justify-center items-center  p-2.5 bg-white max-w-38   transition-transform duration-900 ease-in-out hover:translate-y-1">
      <div className="h-auto shadow-md border  border-blue-200 rounded-sm p-1 ">
        <NavLink to="/review">
          <img src={image} alt={title} className="  w-25  h-25" />
        </NavLink>
      </div>
      <div className="flex flex-wrap flex-col justify-center items-center w-full mt-2.5  gap-2">
        <h2 className="font-md text-stone-400">{title}</h2>
        <p className=" max-w-full whitespace-nowrap overflow-hidden text-ellipsis break-words  font-light">
          {description}
        </p>
        <p className="text-green-300">&#8369;{price}</p>
        <p>{stock}</p>
      </div>

      <button
        className="  rounded-xl p-0.5 px-8 border border-sky-300 cursor-pointer bg-black text-white "
        onClick={cartHandler}
      >
        <FaCartShopping className="text-xl text-white" />
      </button>
    </div>
  );
}

export default Card;
