import {
  ADMIN_ACCESS,
  getAuthData,
  categories,
  enums,
  PRODUCT_CETEGORIES,
} from '../enums';
import {
  useAddProductMutation,
  useGetUserProductsQuery,
  useRemoveProductMutation,
  useUpdateProductItemMutation,
  useGetOrderQuery,
} from '../features/shop/shopApi';
import Form from '../components/Form';
import Input from '../components/Input';
import { useRef, useState } from 'react';
import { FaAsterisk } from 'react-icons/fa6';
import { useForm } from '../components/Hooks';
import ProductTableCard from '../components/Cards/ProductTableCard';
import { useSelector } from 'react-redux';

function AddProductForm() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);

  const { data: product = [] } = useGetUserProductsQuery(undefined, {
    skip: !isAuthenticated,
  });

  const [edit, setEdit] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [clickCat, setClickCat] = useState(null);

  const prodCopy = [...product];
  const clothingCat = prodCopy.filter(
    (p) => p.category === PRODUCT_CETEGORIES.clothing,
  );

  const toyCat = prodCopy.filter((p) => p.category === PRODUCT_CETEGORIES.toys);
  const elecCat = prodCopy.filter(
    (p) => p.category === PRODUCT_CETEGORIES.electronic,
  );

  const forCat = prodCopy.filter(
    (p) => p.category === PRODUCT_CETEGORIES.forniture,
  );

  const [addProduct] = useAddProductMutation();
  const [update] = useUpdateProductItemMutation();
  const [removeProduct] = useRemoveProductMutation();
  const { data: order = [] } = useGetOrderQuery();
  console.log('seller order', order);
  const {
    formData,
    submitHandler,
    changeHandler,
    errors,
    setErrors,
    setFormData,
    preview,
    setPreview,
  } = useForm({
    initialVal: {
      title: '',
      category: '',
      quantity: '',
      price: '',
      images: [],
      size: '',
      description: '',
    },
    onSubmit: async ({ formData }) => {
      const formPayload = new FormData();
      const newProduct = {
        ...formData,
        storeProfile: user.profile,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        storeName: user.storeName,
      };

      Object.entries(newProduct).forEach(([key, value]) => {
        if (key !== 'images') {
          formPayload.append(key, value);
        }
      });

      (formData.images || []).forEach((file) =>
        formPayload.append('images', file),
      );

      if (edit) {
        await update({ id: edit, updatedData: newProduct }).unwrap();
        setIsOpen(false);
        return;
      }
      addProduct(formPayload);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setPreview([]);
    },
  });

  const removeItem = async (itemId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?',
    );
    if (!confirmDelete) return;
    try {
      await removeProduct(itemId).unwrap();
    } catch (err) {
      console.error('Failed to remove product', err);
    }
  };

  const showTableData = (cat) => {
    setClickCat(cat);
  };

  const editHandle = (id) => {
    const item = product.find((p) => p._id === id);
    if (!item) {
      alert('no item found');
      return;
    }
    setIsOpen(true);
    setFormData(item);
    setPreview([]);
    setEdit(id);
  };

  const closeModal = () => {
    setFormData({});
    setEdit(null);
    setErrors({});
    setIsOpen(false);
  };

  const renderData = (cat) => {
    switch (cat) {
      case 'clothing':
        return (
          <div className=" w-full ">
            <ProductTableCard
              header={enums}
              data={clothingCat}
              edit={editHandle}
              remove={removeItem}
            />
          </div>
        );
      case 'electronic':
        return (
          <div className=" w-full ">
            <ProductTableCard
              header={enums}
              data={elecCat}
              edit={editHandle}
              remove={removeItem}
            />
          </div>
        );

      case 'forniture':
        return (
          <div className="  w-full ">
            <ProductTableCard
              header={enums}
              data={forCat}
              edit={editHandle}
              remove={removeItem}
            />
          </div>
        );
      case 'toys':
        return (
          <div className=" w-full ">
            {
              <ProductTableCard
                header={enums}
                data={toyCat}
                edit={editHandle}
                remove={removeItem}
              />
            }
          </div>
        );
    }
  };
  return (
    <div className="flex  min-h-screen flex-col gap-2   text-xs font-extralight mx-auto    bg-slate-700  ">
      <div className=" pl-2 text-white pt-10">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-black px-2 p-1 rounded cursor-pointer  hover:bg-green-200 transition shadow"
        >
          Add Product
        </button>
      </div>
      {isOpen && (
        <div className="absolute flex flex-col pr-3 gap-3 bg-black/70 h-screen justify-center  text-white items-center  w-full ">
          {edit ? (
            <button
              className="bg-black/60 p-1 px-2 rounded relative right-[30%] hover:bg-red-500 cursor-pointer"
              onClick={() => closeModal()}
            >
              X
            </button>
          ) : (
            <button
              className="bg-black/60 p-1 px-2 rounded relative right-[13%] hover:bg-red-500 cursor-pointer"
              onClick={() => closeModal()}
            >
              X
            </button>
          )}
          <Form
            onSubmit={submitHandler}
            header="Please complete me to proceed"
            isProdForm
          >
            <div className=" relative w-full flex gap-4 items-center text-xs">
              <Input
                name="title"
                id="Title"
                value={formData.title}
                placeholder="Enter Product Here .."
                label="Name"
                onChange={changeHandler}
              />
              {errors.title && (
                <span className=" absolute top-[98%] text-red-600">
                  {errors.title}
                </span>
              )}
              <Input
                type="number"
                id="Quantity"
                name="quantity"
                value={formData.quantity}
                label=" Quantity"
                placeholder="Enter Quantity Here.."
                onChange={changeHandler}
              />
              {errors.quantity && (
                <span className=" absolute top-[98%] right-[20%] text-red-600">
                  {errors.quantity}
                </span>
              )}
            </div>
            <div className=" relative w-full flex gap-4 items-center ">
              <Input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                label=" Price"
                placeholder="Enter price Here.."
                onChange={changeHandler}
              />
              {errors.price && (
                <span className=" absolute top-[98%] text-red-600 text-xs">
                  {errors.price}
                </span>
              )}
              <Input
                name="size"
                id="size"
                value={formData.size}
                placeholder="Enter size..SM,MD,LG"
                label="Size"
                onChange={changeHandler}
              />
              {errors.size && (
                <span className=" absolute top-[98%] right-[25%] text-red-600">
                  {errors.size}
                </span>
              )}
            </div>
            <div className=" relative w-full flex flex-col items-center gap-1  text-stone-300  ">
              <label
                className=" pl-7 self-start flex gap-0.5  leading-none items-center   "
                htmlFor="Category"
              >
                <FaAsterisk size={8} color="red" />
                Category
              </label>

              <select
                name="category"
                id="Category"
                value={formData.category}
                onChange={changeHandler}
                className=" bg-black p-1 outline-none  text-white/70 w-full max-w-80 rounded   "
              >
                <option className="bg-black"> Select Category</option>
                {categories.map((cat) => {
                  return (
                    <option value={cat} key={cat} className="bg-black ">
                      {cat}
                    </option>
                  );
                })}
              </select>
              {errors.category && (
                <span className=" absolute top-[98%] text-red-600">
                  {errors.category}
                </span>
              )}
            </div>

            <div className="w-full flex flex-col items-center gap-1 text-stone-300 text-xs">
              <label
                htmlFor="Description"
                className="leading-none pl-7 self-start flex items-center gap-0.5"
              >
                <FaAsterisk size={8} color="red" />
                Product Description
              </label>
              <textarea
                name="description"
                id="Description"
                value={formData.description}
                placeholder="Enter Product Description Here.."
                onChange={changeHandler}
                className="max-w-80 w-full bg-black text-base h-15 p-1 text-white/70 rounded resize-y outline-none text-center focus:border   focus:border-sky-200"
              ></textarea>
              {errors.quantity && (
                <span className="text-red-600">*{errors.quantity}</span>
              )}
            </div>

            <div className=" flex flex-col items-center gap-2 ">
              {edit ? null : (
                <div className="flex flex-col items-center gap-1 text-stone-300 text-xs">
                  <label
                    htmlFor="File"
                    className=" mt-1  bg-black p-1 cursor-pointer rounded text-white flex flex wrap "
                  >
                    Images
                  </label>

                  <input
                    type="file"
                    required={!edit}
                    name="images"
                    id="File"
                    onChange={changeHandler}
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    className="hidden"
                  />
                </div>
              )}

              <div className=" flex justify-center  rounded items-center flex-wrap ">
                {preview?.images?.map((src, i) => (
                  <div
                    key={i}
                    className=" shadow-md border  border-blue-200 rounded-sm p-1 bg-stone-500"
                  >
                    <img
                      src={src}
                      alt="preview"
                      className="rounded-md w-15 h-15 object-fit bg-sky-200  p-0.5 "
                    />
                  </div>
                ))}
              </div>
              <div className=" w-full text-white text-xs text-center  ">
                <button
                  type="submit"
                  className="bg-blue-700  border-b border-b-white cursor-pointer p-1  rounded   px-3 "
                >
                  {edit ? 'Save' : 'Submit'}
                </button>
              </div>
            </div>
          </Form>
        </div>
      )}
      <div className="flex flex-col">
        <div className="flex justify-evenly shadow-md pt-1">
          {categories.map((cat, i) => {
            return (
              <h2
                key={i}
                onClick={() => showTableData(cat)}
                className={
                  cat === clickCat
                    ? 'border-b border-b-red-500 text-white  cursor-pointer'
                    : 'cursor-pointer bg-slate-300 hover:bg-slate-200  px-2 py-0.5 rounded'
                }
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </h2>
            );
          })}
        </div>
        {renderData(clickCat) || (
          <p className="w-full text-center pt-4">
            click Categories to view product{' '}
          </p>
        )}
      </div>
    </div>
  );
}

export default AddProductForm;
