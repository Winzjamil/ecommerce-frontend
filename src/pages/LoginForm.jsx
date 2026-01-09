import {
  FaEyeSlash,
  FaEye,
  FaArrowLeft,
  FaGoogle,
  FaFacebook,
  FaEnvelope,
} from 'react-icons/fa6';
import { userAuth } from '../features/auth/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoMdLogIn } from 'react-icons/io';
import { useForm } from '../components/Hooks';
import Input from '../components/Input';
import Form from '../components/Form';
import { routes } from '../enums';
import { SELLER_ACCESS, ADMIN_ACCESS } from '../enums';
function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const { formData, changeHandler, submitHandler, errors } = useForm({
    initialVal: { email: '', password: '' },
    type: 'login',
    onSubmit: async ({ formData }) => {
      try {
        const res = await dispatch(
          userAuth({ type: 'login', credentials: formData })
        ).unwrap();

        alert(` Welcome ${res.user.userName} `);
        if (res.user.role == SELLER_ACCESS) {
          navigate(routes.ADD_PRODUCT);
        } else if (res.user.role === ADMIN_ACCESS) {
          navigate(routes.ADMIN_DASHBOARD);
        } else {
          navigate(routes.HOME);
        }
      } catch (err) {
        const message = err?.message || err || 'Login failed';
        console.log(message);
        setError(message);

        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    },
  });

  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="h-screen w-full bg-blue-700 flex flex-wrap pb-40 justify-center  items-center">
      <NavLink
        to={routes.HOME}
        className="text-white self-start w-full pt-4 pl-4"
      >
        <FaArrowLeft />
      </NavLink>

      <Form onSubmit={submitHandler}>
        <div className=" flex gap-3 flex-wrap  ">
          <Input
            label="Email"
            id="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Email"
            autoComplete="email"
            autoSave
          />
          {errors.email && (
            <span className="text-red-600 absolute translate-y-18/6 font-extralight text-xs">
              {errors.email}
            </span>
          )}
          {/* {errors.email && <span className="text-red-500">{errors.email}</span>} */}
          <div className="relative w-full">
            <div>
              <Input
                name="password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={changeHandler}
                label="Password"
                autoComplete="password"
                placeholder="Enter Password***"
              />
            </div>

            {errors.password && (
              <span className="text-red-600 absolute top-12 font-extralight text-sm">
                {errors.password}
              </span>
            )}

            <span
              onClick={showPasswordHandler}
              className="absolute right-3 cursor-pointer top-1/2 pt-0.5 text-white/80"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>
        {error && <p className="text-xs text-red-400 font-light">{error}</p>}
        <div className="flex mt-4 justify-center flex-wrap text-sm  text-white items-center ">
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            type="submit"
            className=" flex items-center cursor-pointer gap-1 border-b border-b-whit bg-black/80  rounded-full  font-light  py-0.5 px-3"
          >
            <IoMdLogIn />
            Login
          </button>
          <p className="w-full font-light text-xs text-blue-500/70">
            Continue with
          </p>
          <div className="flex gap-4 items-center">
            <button className=" cursor-pointer bg-black px-2 py-0.5  flex items-center gap-0.5 ">
              <FaGoogle className="text-blue-500 text-xs" />
              <span className="text-red-400 ">o</span>
              <span className="text-yellow-300">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-500">l</span>
              <span className="text-red-400">e</span>
            </button>
            <button className=" cursor-pointer py-0.5 flex  bg-black px-2  items-center  text-blue-600 ">
              <FaFacebook className=" pr-0.5 " />
              <span className="text-blue-600">a</span>
              <span className="text-blue-600">c</span>
              <span className="text-blue-600">e</span>
              <span className="text-blue-600">b</span>
              <span className="text-blue-600">o</span>
              <span className="text-blue-600">o</span>
              <span className="text-blue-600">k</span>
            </button>
            <button className=" py-0.5 cursor-pointer bg-black px-2   flex items-center gap-0.5 text-lg font-extralight ">
              <FaEnvelope className="text-blue-600 text-xs" />
              <span className="text-red-400 font-semibold ">E</span>
              <span className="text-yellow-300">m</span>
              <span className="text-blue-500">a</span>
              <span className="text-green-500">i</span>
              <span className="text-red-400">l</span>
            </button>
          </div>
        </div>

        {/* <button
          onClick={(e) => {
            alert('hjfhhjh');
            e.stopPropagation();
          }}
          className="block font-medium self-start text-sky-900 hover:text-blue-300 cursor-pointer"
        >
          forgot password?
        </button> */}
      </Form>
    </div>
  );
}

export default LoginForm;
