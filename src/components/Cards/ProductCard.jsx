import { FaCartShopping } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

function Card({ image, title, price, description, cartHandler, stock, id }) {
  return (
    <div className="flex flex-wrap justify-center items-center p-1 bg-stone-200 max-w-38   transition-transform duration-900 ease-in-out hover:translate-y-1">
      <div className=" border border-sky-200 rounded w-full ">
        <NavLink to={`/review/${id}`}>
          <img
            src={image}
            alt={title || 'product-image'}
            className="w-40  h-25 object-fit rounded"
          />
        </NavLink>
      </div>
      <div className="flex flex-wrap flex-col justify-center items-center w-full mt-2.5  gap-2">
        <h2 className="font-md text-stone-400">{title}</h2>
        <p className=" max-w-full whitespace-nowrap overflow-hidden text-ellipsis break-words text-sm font-light">
          {description}
        </p>
        <p className="text-green-600">&#8369;{price}</p>
        <p>{stock}</p>
      </div>

      <button
        className="  rounded-xl p-0.5 px-8 border-b-2 border-b-green-600 cursor-pointer bg-sky-200 "
        onClick={cartHandler}
      >
        <FaCartShopping className="text-black" />
      </button>
    </div>
  );
}

export default Card;
