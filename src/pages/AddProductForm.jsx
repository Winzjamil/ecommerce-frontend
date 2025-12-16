import { useRef, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Input from '../components/Input';
import { productHandle } from '../features/productSlice';
import { FaTrash, FaArrowLeft } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../components/Hooks';
import { resetPreview } from '../features/productSlice';
import Form from '../components/Form';
import { FaAsterisk } from 'react-icons/fa6';
function AddProductForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [refresh, setRefresh] = useState(false);
  const preview = useSelector((state) => state.product.preview);
  const [myProd, setMyProd] = useState([]);
  const [edit, setEdit] = useState(null);
  const prodCopy = [...myProd];
  const clothingCat = prodCopy.filter((p) => p.category === 'clothing');
  const toyCat = prodCopy.filter((p) => p.category === 'toys');
  const elecCat = prodCopy.filter((p) => p.category === 'electronic');
  const forCat = prodCopy.filter((p) => p.category === 'forniture');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8080/product${user.id}`);
      const data = await res.json();
      setMyProd(data.data || []);
    };
    fetchData();
  }, [refresh]);

  const { formData, submitHandler, changeHandler, errors, setFormData } =
    useForm({
      initialVal: {
        title: '',
        category: '',
        quantity: 0,
        price: 0,
        image: null,
        size: '',
        description: '',
      },
      onSubmit: async ({ formData }) => {
        const newProduct = {
          title: formData.title,
          price: Number(formData.price),
          quantity: Number(formData.quantity),
          description: formData.description,
          category: formData.category,
          image: preview,
          storeProfile: user.profile,
          storeName: user.storeName,
          size: formData.size,
          id: user.id,
        };
        await dispatch(productHandle({ type: 'add', data: newProduct }));

        if (edit) {
          let updatedProduct = { ...newProduct };
          updatedProduct[edit] = { ...formData };
          const updatedItem = updatedProduct[edit];

          await dispatch(
            productHandle({ type: 'patch', id: edit, data: updatedItem })
          );
        }

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        await dispatch(resetPreview());

        setRefresh((prev) => !prev); // to refetch product
      },
    });

  const fileInputRef = useRef(null);

  const category = ['clothing', 'electronic', 'toys', 'forniture'];
  const enums = ['Name', 'Quantity', 'Price'];
  // ////////////<<<<<<<<<>>>>>>>>>>>>>>>///////////////////////

  const removeItem = async (itemId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (!confirmDelete) return;
    const res = await dispatch(productHandle({ type: 'delete', id: itemId }));
  };
  const editHandle = (id) => {
    const item = myProd.find((p) => p._id === id);
    if (!item) {
      alert('no item found');
      return;
    }
    setFormData(item);
    setEdit(id);
  };
  return (
    <div className="flex flex-wrap min-h-screen justify-center font-extralight mx-auto  items-center  pt-20  bg-blue-700  ">
      {user?.role === 'admin' && (
        <NavLink to="/adminDashboard">
          <FaArrowLeft className="text-black text-xl" />
        </NavLink>
      )}

      <Form onSubmit={submitHandler}>
        <div className=" flex flex-wrap items-center justify-center gap-2  bg-transparent    max-w-200 mx-auto rounded-md p-5 ">
          <Input
            name="title"
            id="Title"
            value={formData.title}
            placeholder="Enter Product Here .."
            label="Name"
            onChange={changeHandler}
          />
          {errors.title && <span className="text-red-600">{errors.title}</span>}
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
            <span className="text-red-600">{errors.quantity}</span>
          )}
          <Input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            label=" Price"
            placeholder="Enter price Here.."
            onChange={changeHandler}
          />
          {errors.quantity && (
            <span className="text-red-600">{errors.price}</span>
          )}
          <Input
            name="size"
            id="size"
            value={formData.size}
            placeholder="Enter size here ..[SM,MD,LG ,XL,2XL]"
            label="Size"
            onChange={changeHandler}
          />
          {/* {errors.quantity && (
              <span className="text-red-600">*{errors.quantity}</span>
            )} */}
          <div className="w-full flex items-center flex-wrap">
            <div>
              <label
                className="block font-medium text-stone-600 leading-none flex items-center text-white  pb-2"
                htmlFor="Category"
              >
                <span className=" text-xs  mr-0.5 text-red-600">
                  <FaAsterisk />
                </span>
                Category
              </label>
            </div>
            <select
              name="category"
              id="Category"
              value={formData.category}
              onChange={changeHandler}
              className="bg-transparent p-0.5 border border-stone-300 outline-none text-white/70 w-full rounded-lg text-center   "
            >
              <option value=""> Select Category</option>
              {category.map((cat) => {
                return (
                  <option value={cat} key={cat} className="bg-red-400">
                    {cat}
                  </option>
                );
              })}
            </select>
          </div>
          {/* {errors.quantity && (
              <span className="text-red-600">*{errors.quantity}</span>
            )} */}
          <div className="w-full flex flex-col ">
            <label
              className="block mt-1 font-medium text-white"
              htmlFor="Description"
            >
              Product Description
            </label>
            <textarea
              name="description"
              id="Description"
              value={formData.description}
              placeholder="Enter Product Description Here.."
              onChange={changeHandler}
              className="max-w-200 w-full  text-base h-24 p-2.5 text-white/70 rounded-md resize-y outline-none text-center border border-stone-300  focus:border-sky-200"
            ></textarea>
          </div>
          <div>
            {errors.quantity && (
              <span className="text-red-600">*{errors.quantity}</span>
            )}
          </div>
          <div className=" w-full  max-w-96 mx-auto">
            <button
              type="submit"
              className="bg-black from-blue-800 to-stone-600 cursor-pointer p-0.5 mx-auto rounded-xl text-white  font-light  w-full "
            >
              Submit
            </button>
          </div>
        </div>

        <div className=" flex flex-col items-center gap-2 ">
          <div className="flex flex-col items-center">
            <label
              htmlFor="File"
              className=" mt-1 font-semibold block text-white flex flex wrap "
            >
              Upload Product Image
            </label>

            <input
              type="file"
              required
              name="image"
              id="File"
              onChange={changeHandler}
              accept="image/*"
              // multiple
              ref={fileInputRef}
              className="p-2.5 bg-amber-500 rounded cursor-pointer text-center  text-3.5"
            />
          </div>
          {preview ? (
            <div className=" flex justify-center p-1 bg-white">
              {preview && (
                <div className="h-auto shadow-md border  border-blue-200 rounded-sm p-1 bg-stone-500">
                  <img
                    src={preview}
                    alt="preview"
                    className="rounded-md w-25 h-25 bg-sky-200 b p-0.5 "
                  />
                </div>
              )}
            </div>
          ) : null}
        </div>
      </Form>

      <p className="mt-4 pl-2 text-lg  w-full pb-2">My Products</p>
      <table className="w-full font-light mt-2 border-t-2 border-t-stone-300 flex-flex-wrap  shadow-md  ">
        <thead className="text-center border-b border-stone-300">
          <tr className="bg-red-200">
            {category.map((cat, i) => {
              return (
                <th
                  className="py-2 w-1/4 font-semibold text-stone-500 "
                  key={i}
                >
                  {cat}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="text-center flex-flex-wrap">
          <tr>
            <td className=" border-b border-white align-top w-1/4">
              <div className="bg-red-900 p-2">
                <table className="w-full text-sm bg-white">
                  <thead>
                    <tr className="border-b border-white">
                      {enums.map((en, i) => {
                        return (
                          <th className="font-semibold p-2 " key={i}>
                            {en}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="bg-stone-300 p-2">
                    {clothingCat
                      ? clothingCat.map((p, i) => {
                          return (
                            <tr key={p._id} className="border-b border-b-white">
                              <td className="flex justify-center p-2">
                                <div className="flex flex-col shadow-md p-2 gap-2 rounded-sm bg-white items-center">
                                  <div className="p-1 rounded-sm shadow-md">
                                    <img
                                      src={p.image}
                                      alt="fh"
                                      className="w-10 h-10"
                                    />
                                  </div>

                                  <p>{p.title}</p>
                                </div>
                              </td>
                              <td>{p.quantity}</td>
                              <td>{p.price}</td>
                              <td>
                                <div className="flex items-center gap-2">
                                  <button
                                    className="p-0.5 w-10 bg-white flex justify-center rounded-sm"
                                    onClick={() => editHandle(p._id)}
                                  >
                                    <FaEdit className="text-green-600 text-center" />
                                  </button>
                                  <button
                                    className="p-0.5 w-10 bg-white flex justify-center rounded-sm"
                                    onClick={() => removeItem(p._id)}
                                  >
                                    <FaTrash className="text-red-600" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              </div>
            </td>
            <td className=" border-b border-white align-top w-1/4 ">
              <div className="bg-red-900 p-2">
                <table className="w-full text-sm bg-white">
                  <thead>
                    <tr className="border-b border-white">
                      {enums.map((en, i) => {
                        return (
                          <th className="font-semibold p-2 " key={i}>
                            {en}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="bg-stone-300 p-2">
                    {elecCat ? (
                      elecCat.map((p) => {
                        return (
                          <tr key={p._id} className="border-b border-b-white">
                            <td className="flex justify-center p-2">
                              <div className="flex flex-col shadow-md p-2 gap-2 rounded-sm bg-white items-center">
                                <div className="p-1 rounded-sm shadow-md">
                                  <img
                                    src={p.image}
                                    alt="fh"
                                    className="w-10 h-10"
                                  />
                                </div>

                                <p>{p.title}</p>
                              </div>
                            </td>
                            <td>{p.quantity}</td>
                            <td>{p.price}</td>
                            <td>
                              <div className="flex items-center gap-2">
                                <button
                                  className="p-0.5 w-10 bg-white flex justify-center rounded-sm"
                                  onClick={() => editHandle(p._id)}
                                >
                                  <FaEdit className="text-green-600 text-center" />
                                </button>
                                <button
                                  className="p-0.5 w-10 bg-white flex justify-center rounded-sm"
                                  onClick={() => removeItem(p._id)}
                                >
                                  <FaTrash className="text-red-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <div>no product in this category</div>
                    )}
                  </tbody>
                </table>
              </div>
            </td>
            <td className=" border-b border-white align-top w-1/4 ">
              <div className="bg-red-900 p-2">
                <table className="w-full text-sm bg-white">
                  <thead>
                    <tr className="border-b border-white">
                      {enums.map((en, i) => {
                        return (
                          <th className="font-semibold p-2 " key={i}>
                            {en}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="bg-stone-300 p-2">
                    {toyCat &&
                      toyCat.map((p) => {
                        return (
                          <tr key={p._id} className="border-b border-b-white">
                            <td className="flex justify-center p-2">
                              <div className="flex flex-col shadow-md p-2 gap-2 rounded-sm bg-white items-center">
                                <div className="p-1 rounded-sm shadow-md">
                                  <img
                                    src={p.image}
                                    alt="fh"
                                    className="w-10 h-10"
                                  />
                                </div>

                                <p>{p.title}</p>
                              </div>
                            </td>
                            <td>{p.quantity}</td>
                            <td>{p.price}</td>
                            <td>
                              <div className="flex items-center gap-2">
                                <button className="p-0.5 w-10 bg-white flex justify-center rounded-sm">
                                  <FaEdit
                                    className="text-green-600 text-center"
                                    onClick={() => editHandle(p._id)}
                                  />
                                </button>
                                <button
                                  className="p-0.5 w-10 bg-white flex justify-center rounded-sm"
                                  onClick={() => removeItem(p._d)}
                                >
                                  <FaTrash className="text-red-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </td>
            <td className=" border-b border-white align-top w-1/4 ">
              <div className="bg-red-900 p-2">
                <table className="w-full text-sm bg-white align-top">
                  <thead>
                    <tr className="border-b border-white w-full">
                      {enums.map((en, i) => {
                        return (
                          <th className="font-semibold p-2 w-1/3" key={i}>
                            {en}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="bg-stone-300 p-2">
                    {forCat &&
                      forCat.map((p) => {
                        return (
                          <tr key={p._id} className="border-b border-b-white">
                            <td className="flex justify-center p-2">
                              <div className="flex flex-col  p-2 gap-2 rounded-sm bg-white items-center">
                                <div className="p-1 rounded-sm shadow-md">
                                  <img
                                    src={p.image}
                                    alt="fh"
                                    className="w-10 h-10"
                                  />
                                </div>

                                <p>{p.title}</p>
                              </div>
                            </td>
                            <td>{p.quantity}</td>
                            <td>{p.price}</td>
                            <td>
                              <div className="flex items-center gap-2">
                                <button className="p-0.5 w-10 bg-white flex justify-center rounded-sm">
                                  <FaEdit
                                    className="text-green-600 text-center"
                                    onClick={() => editHandle(p._id)}
                                  />
                                </button>
                                <button
                                  className="p-0.5 w-10 bg-white flex justify-center rounded-sm"
                                  onClick={() => removeItem(p._d)}
                                >
                                  <FaTrash className="text-red-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AddProductForm;
