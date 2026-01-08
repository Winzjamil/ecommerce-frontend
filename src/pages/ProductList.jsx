import { Select } from 'antd';
import { options } from '../enums';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Card from '../components/Cards/ProductCard';
import CartConfirmation from '../components/CartConfirmation';
import { cartHandler } from '../components/reusable_function';
import { useGetProductsQuery, useGetCartQuery } from '../features/shop/shopApi';

const { Option } = Select;

function ProductList({ inheritBg }) {
  const [isOpen, setIsOpen] = useState(false);
  const [singleItem, setSingleItem] = useState({});
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data: carts = [] } = useGetCartQuery();
  const { data: products = [] } = useGetProductsQuery();

  const searchValue = useSelector((state) => state.product.searchValue);

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!products || products.length === 0) return;
    let result = [...products];

    if (selectedCategory) {
      const filteredByCategory = result.filter(
        (p) => p.category === selectedCategory
      );
      if (filteredByCategory.length === 0) {
        alert(`No products found for category ${selectedCategory}`);
        result = [...products];
      } else {
        result = filteredByCategory;
      }
    }
    if (selectedPrice === 'low') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedPrice === 'high') {
      result.sort((a, b) => b.price - a.price);
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
          : ' bg-blue-400  min-h-screen flex flex-col  items-center gap-10'
      }
    >
      <div className="flex self-start flex-wrap  mt-8 gap-4 items-center  ">
        <span className="bg-stone-500 border-b border-stone-200 p-2.5  mr-4  text-white ">
          Sort By
        </span>

        <Select
          value={selectedPrice}
          onChange={(value) => setSelectedPrice(value || null)}
          placeholder="Sort by price"
          allowClear
          className="min-w-30 !border-stone-200 !bg-transparent"
        >
          {options.price_Option.map((opt) => (
            <Option key={opt.value} value={opt.value}>
              {opt.label}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="filtered by category"
          className="min-w-40 !bg-transparent !border-stone-200 "
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

      <div className="flex flex-wrap justify-center mx-auto w-full items-center gap-1">
        {filteredProducts.length === 0 ? (
          <p> Out Of Stock</p>
        ) : (
          filteredProducts.map((item, index) => {
            return (
              <div key={index}>
                <Card
                  image={item.images[0]}
                  id={item._id}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                  cartHandler={(e) => {
                    cartHandler({
                      pId: item._id,
                      setSingleItem: setSingleItem,
                      setOpen: setIsOpen,
                      carts: carts,
                      products: products,
                    });
                    e.stopPropagation();
                  }}
                />
              </div>
            );
          })
        )}
        {/* {showMessage && (
          <div className="fixed p-4.5 rounded-2.5 bg-green-400">
            {showMessage}
          </div>
        )} */}
        {isOpen ? (
          <div className="absolute h-screen top-0 w-full fixed flex text-white items-center flex-col justify-center iotems-center bg-black/70">
            <button
              onClick={() => setIsOpen(false)}
              className="  p-1 px-1.5 relative right-[10%]  hover:bg-red-500  border-white rounded bg-black/40 backdrop-blur cursor-pointer"
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
