import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa6';

import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import useForm from '../components./Hooks';
import { useForm } from '../components/Hooks';
import Input from '../components/Input';
import Form from '../components/Form';
import { userAuth } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { routes } from '../enums';
function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData, changeHandler, submitHandler, errors } = useForm({
    initialVal: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    onSubmit: async ({ formData }) => {
      console.log('formdata', formData);
      try {
        await dispatch(
          userAuth({ type: 'register', credentials: formData })
        ).unwrap();
        alert('Thanks, you are now registered');
        navigate('/login');
      } catch (err) {
        console.error('error saving data', err);
      }
    },
  });
  const ShowHandler = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className=" fixed h-screen w-full bg-black flex flex-wrap  justify-center gap-2 pb-20 items-center">
      <NavLink
        to={routes.HOME}
        className="w-full text-white self-start pl-4 pt-2"
      >
        <FaArrowLeft />
      </NavLink>
      <Form onSubmit={submitHandler}>
        <div className="flex gap-3 flex-wrap w-full justify-center mb-2 ">
          <Input
            label="User Name"
            name="userName"
            value={formData.userName}
            onChange={changeHandler}
            placeholder="User name"
            autoComplete="given-name"
            id="user-name"
          />

          {errors.userName && (
            <span className="text-red-500 text-sm absolute">
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
          {errors.email && (
            <span className="text-red-500 text-sm top-1/4 translate-y-7 absolute ">
              {errors.email}
            </span>
          )}
        </div>
        <div className="flex gap-3  flex-wrap w-full justify-center">
          <div className=" relative w-full">
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
              className=" absolute right-3 top-1/2  text-white/70"
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
          {errors.confirmPassword && (
            <span className="text-red-600 absolute">
              {errors.confirmPassword}
            </span>
          )}
        </div>
        <div className="w-full flex flex-wrap pl-2 gap-2 mt-4 justify-center items-center">
          <p className=" text-blue-500 hover:bg-">Already an account?</p>
          <NavLink
            to="/login"
            className="p-0.5 w-30 text-center hover:bg-stone-400  shadow-md cursor-pointer rounded-xl"
          >
            Login
          </NavLink>
        </div>
        <div className="w-full flex items-center justify-center">
          <button
            type="submit"
            className="  bg-gradient-to-tr from-blue-800 to-stone-600 w-40 cursor-pointer mt-2 p-0.5 rounded-xl shadow-xl"
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}

export default SignUp;
