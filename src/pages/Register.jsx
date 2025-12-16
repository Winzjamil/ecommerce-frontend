import React, { useRef, useState } from 'react';

import Form from '../components/Form';
import Input from '../components/Input';
import { useForm } from '../components/Hooks';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { resetPreview } from '../features/slice';
import { userAuth } from '../features/userSlice';
import { routes } from '../enums';
function Register() {
  const dispatch = useDispatch();
  const preview = useSelector((state) => state.product.preview);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const ref = useRef();
  const ShowHandler = () => {
    setShowPassword((prev) => !prev);
  };
  const { formData, submitHandler, changeHandler, errors } = useForm({
    initialVal: {
      storeName: '',
      userId: '',
      profile: null,
      account: '',
      password: '',
      role: 'seller',
      confirmPassword: '',
      email: '',
      userName: '',
    },

    onSubmit: async ({ formData }) => {
      const updatedFormData = {
        ...formData,
        profile: preview,
      };
      // console.log(updatedFormData);
      // return;
      try {
        await dispatch(
          userAuth({ type: routes.LOGIN, credentials: updatedFormData })
        ).unwrap();

        alert('Thanks, you are now registered');
        navigate(routes.LOGIN);

        await dispatch(resetPreview());
        ref.current.value = '' || null;
      } catch (err) {
        console.error('error saving data', err);
      }
    },
  });

  return (
    <div className=" fixed  min-h-screen  bg-black flex flex-wrap justify-center w-full items-center   mx-auto ">
      <NavLink
        to={routes.HOME}
        className="w-full text-white self-start pl-4 pt-2"
      >
        <FaArrowLeft />
      </NavLink>
      <Form onSubmit={submitHandler}>
        <div className="w-full flex gap-8 mb-4">
          <Input
            label="StoreName"
            name="storeName"
            value={formData.storeName}
            onChange={changeHandler}
            placeholder="Enter your store "
            autoComplete="given-store"
            id="storeName"
          />
          {errors.storeName && (
            <span className="text-red-500 top-[25%]  font-light text-xs absolute">
              {errors.storeName}
            </span>
          )}
          <Input
            label="User name"
            name="userName"
            value={formData.userName}
            onChange={changeHandler}
            placeholder="Enter your name "
            autoComplete="given-name"
            id="user-name"
          />
          {errors.userName && (
            <span className="text-red-500 right-[35%] top-[25%] font-light text-xs absolute">
              {errors.userName}
            </span>
          )}
        </div>
        <div className="w-full flex gap-8 mb-4">
          <Input
            label="User Id"
            name="userId"
            value={formData.userId}
            onChange={changeHandler}
            placeholder="Enter your Id"
            autoComplete="given-id"
            id="store-id"
          />
          {errors.userId && (
            <span className="text-red-500  font-light text-xs absolute">
              {errors.userId}
            </span>
          )}
          <Input
            label="Account No."
            name="account"
            value={formData.account}
            onChange={changeHandler}
            placeholder=" Enter Account***"
            autoComplete="given-account"
            type="number"
            id="account"
          />
          {errors.userName && (
            <span className="text-red-500 right-[35%] top-[25%] font-light text-xs absolute">
              {errors.userName}
            </span>
          )}
        </div>
        <Input
          label="Email"
          id="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Email"
          autoComplete="email"
        />
        <div className="w-full flex gap-8 mt-4">
          <div className="relative w-full">
            <Input
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={changeHandler}
              placeholder="Password"
              autoComplete="password"
              id="Password"
            />
            <span
              onClick={ShowHandler}
              className=" absolute right-3 top-1/2 pt-0.5  text-gray-700"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={changeHandler}
            placeholder="Confirm Password"
            autoComplete="current-password"
            id="Confirm"
          />
          {/* {errors.confirmPassword && (
            <span className="text-red-600">{errors.confirmPassword}</span>
          )} */}
        </div>
        <div className=" flex flex-wrap mt-5 w-full items-center justify-center ">
          <label
            htmlFor="File"
            className=" w-full mt-1 text-white text-center font-semibold"
          >
            Choose Profile
          </label>
          <input
            type="file"
            name="profile"
            id="File"
            required
            onChange={changeHandler}
            accept="image/*"
            ref={ref}
            className="p-2.5  rounded-md cursor-pointer text-stone-400 border border-white w-1/2 "
          />

          <div className=" flex justify-center  p-1 mt-2 w-full ">
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
        </div>
        <div className="w-full flex justify-between pl-2 gap-2 items-center">
          <p className=" text-blue-500 hover:text-blue-700">
            Already an account?
          </p>
          <NavLink
            to="/login"
            className="p-0.5 w-30 text-center hover:bg-stone-400  shadow-md cursor-pointer rounded-xl"
          >
            Login
          </NavLink>
        </div>
        <div className="w-full text-center">
          <button
            type="submit"
            className=" bg-black text-white border boerder-white w-40 cursor-pointer mt-2 p-0.5 rounded-xl shadow-xl"
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Register;
