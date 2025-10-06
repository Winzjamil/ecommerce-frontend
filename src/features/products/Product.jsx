import { useContext, useState } from 'react';
import { FaCartShopping, FaArrowLeft } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import { GlobalContext } from '../../context/GlobalContext';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import Card from '../../components/Cards/ProductCard';
import CustomSelect from '../../components/Custom/CustomSelect';
import { IoMdLogIn } from 'react-icons/io';

function Product() {
  const { products, carts, setCarts } = useContext(GlobalContext);
  const { user, logoutUser } = useAuth();
  const [sortedCat, setSortedCat] = useState([]);
  const [isSortedByCat, setIsSortedByCat] = useState(false);

  const [sortedPrice, setSortedPrice] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  const [showMessage, setShowMessage] = useState(false);

  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setsearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  /////////////////////////////////////////////////////////////////////

  const cartHandler = async (productId) => {
    const productToAdd = [...products].find((p) => p._id === productId);
    if (!productToAdd) {
      alert('item not found');
      return;
    }
    if (!isInCart(productId)) {
      const productWithQuantity = {
        ...productToAdd,
        unitPrice: productToAdd.price,
        itemQuantity: 1,
      };

      try {
        const response = await fetch('http://localhost:8080/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productWithQuantity),
        });
        const result = await response.json();
        if (!response.ok) {
          alert('something went wrong saving this item');
        }
        setCarts(result.data);
      } catch (err) {
        console.error('error saving cart', err);
      }
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } else {
      alert('item is already in cart');
    }
  };

  const isInCart = (itemId) => {
    return carts.some((item) => item._id === itemId);
  };

  const searchHandler = (e) => {
    const toSearch = [...products].filter((product) =>
      product.title.toLowerCase().includes(e.target.value.trim().toLowerCase())
    );
    setSearchResult(toSearch);
    setsearchValue(e.target.value.trim());
  };

  const sortedCategoryHandler = (selectedOption) => {
    if (!selectedOption) {
      setIsSortedByCat(false);
      return;
    }
    const sortedCat = [...products].filter(
      (p) => p.category === selectedOption.value
    );
    if (sortedCat.length === 0) {
      alert('No products found in this category');
      return;
    }
    setSortedCat(sortedCat);
    setIsSortedByCat(true);
  };

  const handleSortChange = (selectedOption) => {
    console.log('selected option', selectedOption);
    if (!selectedOption) {
      setSortedPrice(products);
      setIsSorted(false);
      return;
    }
    const sortedPrice = [...products].sort((a, b) =>
      selectedOption.value === 'low' ? a.price - b.price : b.price - a.price
    );
    setSortedPrice(sortedPrice);
    setIsSorted(true);
  };

  let itemToShow = [];

  if (searchValue) {
    itemToShow = searchResult;
  } else if (isSorted) {
    itemToShow = sortedPrice;
  } else if (isSortedByCat) {
    itemToShow = sortedCat;
  } else {
    itemToShow = products;
  }
  const catOption = [
    { value: 'electronic', label: 'Electronic' },
    { value: 'forniture', label: 'Forniture' },
    { value: 'toys', label: 'Toy' },
    { value: 'clothing', label: 'Clothing' },
  ];
  const options = [
    { value: 'low', label: 'Low ' },
    { value: 'high', label: ' High' },
  ];

  return (
    <div className=" bg-lime-100 flex flex-wrap items-center justify-center">
      <div className="w-full bg-black p-4 flex  justify-between items-center ">
        <div className="w-full flex items-center  justify-center">
          <div className="relative w-full max-w-96 ">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-black text-lg" />
            <input
              type="text"
              value={searchValue}
              onChange={searchHandler}
              placeholder="Search Your Favorites here..."
              className="w-full pl-10 pr-4 py-1 rounded-xl bg-white text-gray-700 outline-none border border-gray-300 focus:ring-2 "
            />
          </div>
        </div>
        <div className="flex  gap-2.5 justify-center items-center">
          <div>
            <NavLink to={'/carts'} className="text-white text-2xl">
              <FaCartShopping />
            </NavLink>
          </div>

          {!user ? (
            <>
              <NavLink
                to={'/signUp'}
                className="border-none p-1 rounded-md bg-blue-300 hover:bg-blue-500 outline-none w-16 cursor-pointer text-center"
              >
                Sign up
              </NavLink>

              <NavLink
                className="border-none p-1  rounded-md  bg-blue-300 hover:bg-blue-500 cursor-pointer flex items-center gap-1.5"
                to={'/login'}
              >
                <span className="text-white">
                  <IoMdLogIn />
                </span>
                Login
              </NavLink>
            </>
          ) : (
            <button
              onClick={() => logoutUser()}
              className="border-none p-1 rounded-md  bg-white  cursor-pointer text-center"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap w-full mt-4 gap-4 items-center bg-white p-1">
        <div className="bg-red-700 p-2.5 mr-4 shadow-sm text-white font-bold">
          <h2>Sort By</h2>
        </div>

        <div className=" shadow-sm rounded-sm">
          <CustomSelect
            options={options}
            placeholder="Price"
            isClearable
            onChange={handleSortChange}
          />
        </div>

        <div className=" shadow-sm rounded-md ">
          <CustomSelect
            options={catOption}
            placeholder="Select Category"
            isClearable
            onChange={sortedCategoryHandler}
          />
        </div>
      </div>
      {user?.role === 'admin' && (
        <NavLink to="/adminDashboard" className="self-start mt-1">
          <FaArrowLeft />
        </NavLink>
      )}
      <div className="flex flex-wrap justify-center item-center p-2.5 gap-2.5">
        {products.length === 0 ? (
          <p> Out Of Stock</p>
        ) : (
          itemToShow &&
          itemToShow.map((item, index) => {
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
            Item added successfully!
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
