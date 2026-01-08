import Form from '../components/Form';
import Input from '../components/Input';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../components/Hooks';
import { userAuth } from '../features/auth/userSlice';
import { routes, SELLER_ACCESS } from '../enums';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa6';

function Register() {
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    formData,
    submitHandler,
    changeHandler,
    errors,
    preview,
    setPreview,
  } = useForm({
    initialVal: {
      storeName: '',
      profile: null,
      account: '',
      password: '',
      role: SELLER_ACCESS,
      confirmPassword: '',
      email: '',
      userName: '',
    },

    onSubmit: async ({ formData }) => {
      const updatedFormData = {
        ...formData,
        profile: preview.profile[0],
      };

      try {
        await dispatch(
          userAuth({ type: 'register', credentials: updatedFormData })
        ).unwrap();

        alert('Thanks, you are now registered');
        navigate(routes.LOGIN);
        ref.current.value = '';
        setPreview(!preview);
      } catch (err) {
        console.error('error saving data', err);
      }
    },
  });

  const ShowHandler = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="  min-h-screen  bg-blue-700 flex flex-col gap-20 w-full items-center    ">
      <NavLink to={routes.HOME} className="w-full text-white  pl-4 pt-2">
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
        </div>

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
              className=" absolute right-3 top-1/2 pt-0.5  text-white"
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
        <div className=" flex flex-col mt-5 gap-1 w-full items-center text-xs text-gray-200  justify-center ">
          <label
            htmlFor="File"
            className=" bg-black/60 cursor-pointer p-1 rounded  text-center text-stone-300 "
          >
            Add Logo
          </label>
          <input
            type="file"
            name="profile"
            id="File"
            required
            onChange={changeHandler}
            accept="image/*"
            ref={ref}
            className="p-2 hidden rounded-md cursor-pointer   "
          />

          <div className="  flex justify-center items-center  p-1  w-full ">
            {preview.profile ? (
              <div className="h-auto shadow-md border  border-blue-200 rounded-sm p-1 bg-stone-500">
                <img
                  src={preview.profile[0]}
                  alt="preview"
                  className="rounded-md w-25 h-25 bg-sky-200 b p-0.5 "
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-full flex justify-between pl-2  items-center text-sm">
          <span className=" text-blue-400 hover:text-blue-700">
            Already an account?
          </span>
          <NavLink
            to="/login"
            className="py-0.5 px-2 hover:bg-stone-400  border text-white border-sky-200/60 cursor-pointer "
          >
            Login
          </NavLink>
        </div>
        <div className="w-full text-center text-white mt-4 text-sm">
          <button
            type="submit"
            className=" bg-black/80 text-white border-b boerder-b-white px-4 cursor-pointer mt-2 py-1 rounded-md"
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Register;
