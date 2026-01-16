import img1 from '../../../assets/img1.jpg';
import { FaTrash } from 'react-icons/fa6';
import {
  useGetProductsQuery,
  useAdminRemoveProductMutation,
} from '../../../features/shop/shopApi';

function ProductList() {
  const { data: items = [] } = useGetProductsQuery();
  const [remove] = useAdminRemoveProductMutation();
  const removeHandle = async (id) => {
    const item = items.find((item) => item._id === id);
    if (!item) {
      alert('no item found');
      return;
    }
    const confitmDel = window.confirm('are you sure te remove this item ');
    if (!confitmDel) return;
    await remove(item._id);
  };

  return (
    <div className="flex items center gap-2 flex-wrap p-1 ">
      {items?.map((item) => (
        <div
          key={item._id}
          className="flex flex-wrap justify-center items-center p-1 gap-1 bg-stone-200 max-w-38 shadow  transition-transform duration-900 ease-in-out hover:translate-y-1"
        >
          <div className=" border border-sky-200 rounded w-full ">
            <img
              src={item.images[0]}
              alt={item.title}
              className="  w-full  h-25 object-fit rounded"
            />
          </div>
          <div className="flex  flex-col  items-center w-full  gap-2">
            <h2 className="font-md text-stone-400">{item.title} </h2>
            <span className=" max-w-full whitespace-nowrap overflow-hidden text-ellipsis break-words text-sm font-light">
              {item.description}
            </span>
            <span className="text-green-600">&#8369;{item.price}</span>
            <span>{item.stock}</span>
          </div>

          <button
            onClick={() => removeHandle(item._id)}
            className="   p-0.5  cursor-pointer bg-sky-200 "
          >
            <FaTrash color="red" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
