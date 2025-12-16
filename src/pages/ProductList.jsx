import { useEffect, useState } from 'react';
import Card from '../components/Cards/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { productHandle } from '../features/productSlice';
import { useNavigate, NavLink } from 'react-router-dom';
import { FaArrowLeft, FaCartShopping, FaFilter } from 'react-icons/fa6';
import { Select } from 'antd';
import { options } from '../enums';
import CartConfirmation from '../components/CartConfirmation';
const { Option } = Select;

function ProductList({ inheritBg }) {
  const [showMessage, setShowMessage] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [singleItem, setSingleItem] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const carts = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.product.items);
  const searchValue = useSelector((state) => state.product.searchValue);

  /////>>>>>>>>>>>>>>>>>><<<<<<<<<<</////////

  useEffect(() => {
    dispatch(productHandle({ type: 'get' }));
  }, [dispatch]);

  const navigate = useNavigate();
  const cartHandler = async (pId) => {
    const isInCart = [...carts].some((c) => c._id === pId);
    const product = [...products].find((p) => p._id === pId);
    if (!user) {
      navigate('/login');
      return;
    }
    if (isInCart) {
      alert('item is already in cart ');
      return;
    } else {
      setSingleItem(product);
      setIsOpen(true);
    }
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!products) return;
    let result = [...products];
    if (selectedCategory) {
      const filteredByCategory = result.filter(
        (p) => p.category === selectedCategory
      );
      if (filteredByCategory.length === 0) {
        alert(`No products found for category "${selectedCategory}"`);
        result = [...products];
      } else {
        result = filteredByCategory;
      }
    }

    if (selectedPrice) {
      result.sort((a, b) =>
        selectedPrice.value === 'low' ? a.price - b.price : b.price - a.price
      );
    }

    if (searchValue) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    setFilteredProducts(result);
  }, [products, selectedCategory, selectedPrice, searchValue]);

  return (
    <div
      className={
        inheritBg
          ? 'bg-transparent'
          : ' bg-gradient-to-tr from-blue-800  min-h-screen to-stone-600 flex pt-20 flex-wrap items-center justify-center'
      }
    >
      <div className="flex flex-wrap w-full mt-10 gap-4 items-center  ">
        <div className="flex items-center bg-white/40 gap-2 pr-2 shadow-md">
          <div className="bg-stone-500 border-b border-stone-200 p-2.5  mr-4 shadow-sm text-white font-bold">
            <h2>Sort By</h2>
          </div>

          <Select
            value={selectedPrice}
            onChange={(option) => setSelectedPrice(option)}
            placeholder="Sort by price"
            allowClear
            className="min-w-30 !bg-transparent !border-stone-400 "
          >
            {options.price_Option.map((opt) => (
              <Option value={opt.value}>{opt.label}</Option>
            ))}
          </Select>
          <Select
            placeholder="filtered by category"
            className="min-w-40 !bg-transparent !border-stone-400 "
            value={selectedCategory}
            onChange={(option) => setSelectedCategory(option)}
            allowClear
          >
            {options.cat_Option.map((opt) => (
              <Option value={opt.value} className="!bg-transparent">
                {opt.label}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      {user?.role === 'admin' && (
        <NavLink to="/adminDashboard" className="self-start mt-1">
          <FaArrowLeft />
        </NavLink>
      )}
      <div className="flex flex-wrap justify-center items-center pt-10 gap-1">
        {filteredProducts.length === 0 ? (
          <p> Out Of Stock</p>
        ) : (
          filteredProducts.map((item, index) => {
            return (
              <div key={index}>
                <Card
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                  cartHandler={(e) => {
                    cartHandler(item._id);
                    e.stopPropagation();
                  }}
                />
              </div>
            );
          })
        )}
        {showMessage && (
          <div className="fixed p-4.5 rounded-2.5 bg-green-400">
            {showMessage}
          </div>
        )}
        {isOpen ? (
          <div className="absolute inset-0 h-auto flex flex-col  justify-center bg-black/70">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white self-start ml-4 px-3 py-2 rounded bg-black/40 backdrop-blur cursor-pointer"
            >
              X
            </button>
            <CartConfirmation item={singleItem} onClose={() => closeModal()} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProductList;
