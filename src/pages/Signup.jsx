import { useState, useRef } from 'react';
import { routes } from '../enums';
import Form from '../components/Form';
import Input from '../components/Input';
import { useDispatch } from 'react-redux';
import { useForm } from '../components/Hooks';
import { userAuth } from '../features/auth/userSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa6';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const {
    formData,
    changeHandler,
    submitHandler,
    errors,
    preview,
    setPreview,
  } = useForm({
    initialVal: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      profile: [],
    },

    onSubmit: async ({ formData }) => {
      console.log();
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'profile') {
          formPayload.append(key, value);
        }
      });

      formData.profile?.forEach((file) => {
        formPayload.append('profile', file);
      });
      for (let [key, value] of formPayload.entries()) {
        console.log('key', key, '>>>>>>>> value', value);
      }

      try {
        await dispatch(
          userAuth({ type: 'register', credentials: formPayload })
        ).unwrap();
        alert('Thanks, you are now registered');
        profileRef.current.value = null;
        setPreview([]);
        navigate(routes.LOGIN);
      } catch (err) {
        console.error('error saving data', err);
      }
    },
  });

  return (
    <div className=" h-screen w-full bg-blue-700 flex flex-col gap-2  gap-20  items-center">
      <NavLink
        to={routes.HOME}
        className="w-full text-white self-start pl-4 pt-2"
      >
        <FaArrowLeft />
      </NavLink>
      <Form onSubmit={submitHandler}>
        <div className=" relative flex gap-3 flex-wrap w-full justify-center mb-2 ">
          <Input
            label="User Name"
            name="userName"
            value={formData.userName}
            onChange={changeHandler}
            placeholder="User name"
            autoComplete="given-name"
            id="Username"
          />

          {errors.userName && (
            <p className="text-red-600 text-xs absolute top-[42%]">
              {errors.userName}
            </p>
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
          {errors.email && (
            <p className="text-red-600 text-xs  absolute top-[98%] ">
              {errors.email}
            </p>
          )}
        </div>
        <div className=" relative flex gap-3  flex-wrap w-full justify-center">
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
            onClick={() => setShowPassword(!showPassword)}
            className=" absolute top-[25%] right-[3%] cursor-pointer text-stone-200"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>

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
          {errors.confirmPassword && (
            <p className="text-red-600 text-xs absolute top-[98%]">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <div className=" flex flex-col mt-5 gap-1 w-full items-center text-xs text-gray-200  justify-center ">
          <label
            htmlFor="File"
            className=" bg-black/60 cursor-pointer p-1 rounded  text-center text-stone-300 "
          >
            Choose Profile
          </label>
          <input
            type="file"
            name="profile"
            id="File"
            onChange={changeHandler}
            accept="image/*"
            ref={profileRef}
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
        <div className="w-full flex flex-wrap pl-2 gap-2 mt-4 justify-evenly text-sm items-center">
          <span className=" text-blue-500 hover:bg-">Already an account?</span>
          <NavLink
            to="/login"
            className="p-0.5  hover:bg-stone-400 px-2 border border-sky-200/60 text-white shadow-md cursor-pointer"
          >
            Login
          </NavLink>
        </div>

        <div className="w-full flex items-center text-sm text-white mt-4 justify-center">
          <button
            type="submit"
            className="  bg-blue-800 px-2  cursor-pointer border-b border-b-white py-0.5 rounded "
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}

export default SignUp;
