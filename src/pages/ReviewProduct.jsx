import { getAuthData } from '../enums';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { cartHandler } from '../components/reusable_function';
import CartConfirmation from '../components/CartConfirmation';
import { useGetProductsQuery, useGetCartQuery } from '../features/shop/shopApi';

function ReviewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getAuthData('user');
  const { data: carts = [] } = useGetCartQuery();
  const { data: products = [] } = useGetProductsQuery();

  const [singleItem, setSingleItem] = useState({});
  const [mainImage, setMainImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const product = products.find((p) => p._id === id);

  useEffect(() => {
    if (product?.images?.length) {
      setMainImage(product.images[0]);
    }
  }, [product]);
  if (!product) return <p>Product not found</p>;
  return (
    <div className="flex min-h-screen items-center  gap-2  bg-gradient-to-tr from-blue-800  to-stone-600  ">
      <div className="flex flex-col p-4  rounded-sm gap-2">
        {product.images.map((img, i) => {
          return (
            <div key={i} className=" border border-white p-0.5 rounded-md">
              <div className="p-2 bg-red-300">
                <img
                  src={img}
                  alt={`thumb-${i}`}
                  className="w-15 h-15 rounded-md cursor-pointer "
                  onClick={() => setMainImage(img)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className=" flex flex-wrap items-center ">
        <div className="w-full border border-white rounded-sm bg-stone-400 p-3">
          <img
            src={mainImage}
            alt={product.title}
            className=" w-50 h-50 object-cover rounded-xl"
          />

          <div className="flex flex-col items-center gap-1 ">
            <p>{product.title}</p>
            <p className="text-green-400">&#8369;{product.price}</p>
            <div className="flex w-full gap-2 justify-between text-white text-sm ">
              <button
                onClick={() =>
                  cartHandler({
                    pId: product._id,
                    products: products,
                    carts: carts,
                    setOpen: setIsModalOpen,
                    navigate: navigate,
                    setSingleItem: setSingleItem,
                    user: user,
                  })
                }
                className="p-0.5 rounded-xl bg-gradient-to-tr from-red-600 to-black text-white font-light cursor-pointer w-25"
              >
                Add to cart
              </button>
              <button className="p-0.5 rounded-xl bg-gradient-to-tr from-red-600 to-black text-white font-light cursor-pointer w-17">
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-black/60 items-center text-sm text-white rounded border border-stone-600">
        <h3>Description</h3>
        <p className="p-1  w-30 break-words text-xs ">{product.description}</p>
      </div>

      {isModalOpen ? (
        <div className="absolute  min-h-screen w-full  flex  flex-col bg-black/70 fixed">
          <div className="w-full text-white translate-y-20 translate-x-2 ">
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-white border px-3 py-2 rounded bg-black/40 backdrop-blur cursor-pointer"
            >
              X
            </button>
          </div>
          <CartConfirmation item={product} onClose={() => closeModal()} />
        </div>
      ) : null}
    </div>
  );
}

export default ReviewProduct;
