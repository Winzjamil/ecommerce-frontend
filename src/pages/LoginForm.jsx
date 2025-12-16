import { FaEyeSlash, FaEye, FaArrowLeft } from 'react-icons/fa6';
import { userAuth } from '../features/userSlice';
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
  const { formData, changeHandler, submitHandler, errors } = useForm({
    initialVal: { email: '', password: '' },
    type: 'login',
    onSubmit: async ({ formData }) => {
      try {
        const res = await dispatch(
          userAuth({ type: 'login', credentials: formData })
        ).unwrap();
        alert('hellow  gago');
        if (res.user.role == SELLER_ACCESS) {
          navigate(routes.ADD_PRODUCT);
        } else if (res.user.role === ADMIN_ACCESS) {
          navigate('/adminDashboard');
        } else {
          navigate(routes.HOME);
        }
      } catch (err) {
        console.error(err.message);
      }
    },
  });

  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="h-screen w-full bg-black flex flex-wrap pb-40 justify-center  items-center">
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
              className="absolute right-3 top-1/2 pt-0.5 text-white/80"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>
        <div className="flex mt-4 justify-center items-center ">
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            type="submit"
            className=" flex flex-wrap items-center justify-center cursor-pointer gap-1 bg-gradient-to-tr  from-blue-800 to-stone-600 text-white font-light  p-0.5 w-40  rounded-xl shadow-xl"
          >
            <IoMdLogIn />
            Login
          </button>
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
