import { useContext, useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Input from './Input';
import { productHandle } from '../features/productSlice';
import { FaTrash, FaArrowLeft } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';

function AddProductForm() {
  const dispatch = useDispatch();
  const { items: products } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(productHandle({ type: 'fetch' }));
  }, [dispatch]);

  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    price: '',
    description: '',
    image: null,
    title: '',
    quantity: '',
    category: '',
  });
  const category = ['clothing', 'electronic', 'toys', 'forniture'];

  ////////////////////////////////////////////////////////
  const fileToBase64 = (objectFile) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(objectFile);
    });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    let processedVal = value;
    if ((name === 'title' || name === 'description') && value) {
      processedVal = value.charAt(0).toUpperCase() + value.slice(1);
    }
    if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      fileToBase64(files[0]).then((base64) => {
        setPreviewUrl(base64);
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: processedVal,
      }));
    }

    setErrors((prev) => ({
      ...prev,
      [name]: null,
    }));
  };

  const formValidate = () => {
    const newErrors = {};
    if (!formData.title) {
      newErrors.title = 'Product Name is required';
    }
    if (!formData.price) {
      newErrors.price = 'Product Price is required';
    }
    if (!formData.description) {
      newErrors.description = 'Product Description is required';
    }
    if (!formData.quantity) {
      newErrors.quantity = 'Product Quantity is required';
    }
    if (!formData.category) {
      newErrors.category = 'Product Category is required';
    }
    return newErrors;
  };
  ////////////<<<<<<<<<>>>>>>>>>>>>>>>///////////////////////
  const submitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = formValidate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const newProduct = {
      title: formData.title,
      price: formData.price,
      description: formData.description,
      category: formData.category,
      quantity: formData.quantity,
      image: previewUrl,
    };
    dispatch(productHandle({ type: 'add', newProduct: newProduct }));
    setPreviewUrl(null);
    setFormData({
      price: '',
      description: '',
      title: '',
      quantity: '',
      category: '',
    });

    // to empty input file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeItem = async (itemId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (!confirmDelete) return;

    dispatch(productHandle({ type: 'delete', id: itemId }));
  };

  return (
    <div className="flex flex-wrap p-2.5 items-center justify-center flex-col">
      {user?.role === 'admin' && (
        <NavLink to="/adminDashboard">
          <FaArrowLeft className="text-red-400" />
        </NavLink>
      )}
      <form
        onSubmit={submitHandler}
        className="flex flex-wrap justify-around items-center bg-sky-500 p-4 rounded-md"
      >
        <div className="flex flex-col gap-2">
          <Input
            name="title"
            id="Title"
            value={formData.title}
            placeholder="Enter Product Here .."
            label="Product Name"
            onChange={handleChange}
            className="bg-white p-2 outline-none border border-black focus:border-orange-700 focus:border-2 rounded-lg  text-center w-72"
          />
          <div>
            {errors.title && (
              <span className="text-red-600">*{errors.title}</span>
            )}
          </div>
          <div>
            <label className="block font-bold" htmlFor="Category">
              Product Category{' '}
            </label>
            <select
              name="category"
              id="Category"
              value={formData.category}
              onChange={handleChange}
              className="bg-white p-2 outline-none  border border-black focus:border-orange-700 focus:border-2 w-72 rounded-lg text-center "
            >
              <option value=""> Select Category</option>
              {category.map((cat) => {
                return (
                  <option value={cat} key={cat}>
                    {cat}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Input
            type="number"
            id="Quantity"
            name="quantity"
            value={formData.quantity}
            label="Product Quantity"
            placeholder="Enter Quantity Here.."
            onChange={handleChange}
            className="bg-white p-2  outline-none border border-black rounded-lg  text-center w-72 focus:border-orange-700 focus:border-2"
          />
          <div>
            {errors.quantity && (
              <span className="text-red-600">*{errors.quantity}</span>
            )}
          </div>
          <Input
            id="Price"
            type="number"
            name="price"
            value={formData.price}
            label="Product Price"
            placeholder="Enter  Price Here.."
            onChange={handleChange}
            className="bg-white p-2 outline-none border border-black focus:border-orange-700 focus:border-2  rounded-lg  text-center w-72"
          />
        </div>

        <div className="w-full text-center">
          <label className="block mt-1 font-bold" htmlFor="Description">
            Product Description{' '}
          </label>
          <textarea
            name="description"
            id="Description"
            value={formData.description}
            placeholder="Enter Product Description Here.."
            onChange={handleChange}
            className="max-w-[400px] w-full  text-base h-24 p-2.5 bg-transparent rounded-md resize-y outline-none text-center border border-white  focus:border-2"
          ></textarea>
        </div>
        <div>
          <label htmlFor="File" className="block mt-1 font-bold">
            Upload Product Image
          </label>
          <input
            type="file"
            name="file"
            id="File"
            onChange={handleChange}
            accept="image/*"
            ref={fileInputRef}
            className="p-2.5 bg-amber-500 rounded cursor-pointer text-3.5"
            required
          />
        </div>
        <div>
          {previewUrl && (
            <div className=" rounded- md p-2.5">
              <img
                src={previewUrl}
                alt="preview"
                className="rounded-md w-32 h-32 "
              />
            </div>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="bg-white cursor-pointer p-2 rounded-md "
          >
            Add product
          </button>
        </div>
      </form>

      <div className=" flex flex-wrap  gap-2 mt-2 p-2 ">
        {products.length === 0 ? (
          <p>EMPTY</p>
        ) : (
          Array.isArray(products) &&
          products.map((item, index) => {
            return (
              <div
                key={index}
                className=" text-white min-w-32 max-w-33 p-2.5  bg-slate-950 shadow-[0_1px_2px_0_#F2F2F2]  flex flex-wrap flex-col items-center"
              >
                <div className="h-auto shadow-[0_1px_2px_0_#F2F2F2] rounded-md p-2.5">
                  <img src={item.image} alt="preview" className=" w-32 h-32" />
                </div>
                <h1>{item.title}</h1>
                <p className="text-amber-300"> &#8369;{item.price} </p>
                (Category)
                <p>{item.category} </p>
                <p className=" max-w-full whitespace-nowrap overflow-hidden text-ellipsis break-words ">
                  {item.description}
                </p>
                <div>Stock: {item.quantity}</div>
                <button
                  onClick={() => removeItem(item._id)}
                  className="cursor-pointer text-red-600 text-lg"
                >
                  <FaTrash />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AddProductForm;
