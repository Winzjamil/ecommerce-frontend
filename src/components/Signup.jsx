import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa6';
import { GlobalContext } from '../context/GlobalContext';
import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useForm from './Hooks';
import Input from './Input';
import Form from './Form';

function SignUp() {
  const { navigate } = useContext(GlobalContext);
  const [showPassword, setShowPassword] = useState(false);
  const { formData, changeHandler, submitHandler, errors } = useForm({
    initialVal: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (formData) => {
      try {
        const response = await fetch('http://localhost:8080/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!response.ok) {
          console.error('server error', data);
          return;
        }
        alert(`${data.message}`);
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
    <div className="fixed inset-0 bg-purple-300 flex justify-center p-4 items-center">
      <button
        onClick={() => navigate('/')}
        className=" p-2.5 bg-transparent self-start rounded-lg cursor-pointer"
      >
        <FaArrowLeft />
      </button>
      <Form header={'hello'} onSubmit={submitHandler}>
        <div>
          <Input
            label="Fullname"
            name="fullName"
            value={formData.fullName}
            onChange={changeHandler}
            placeholder="Fullname"
            autoComplete="given-name"
            id="full-Name"
          />

          <div>
            {errors.fullName && (
              <span className="text-red-600">{errors.fullName}</span>
            )}
          </div>
        </div>
        <div>
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
          <div>
            {errors.email && (
              <span className="text-red-600">{errors.email}</span>
            )}
          </div>
        </div>
        <div className="relative w-72">
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
            className=" absolute right-3 top-1/2 pt-1 text-gray-700"
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
        <div>
          {errors.confirmPassword && (
            <span className="text-red-600">{errors.confirmPassword}</span>
          )}
        </div>
        <div className="w-full text-center">
          <p className=" text-lg">
            Have an Account?
            <NavLink
              to="/login"
              className="p-1.5 font-bold shadow-md cursor-pointer rounded-md"
            >
              Login
            </NavLink>
          </p>
        </div>
        <div className="w-full text-center">
          <button
            type="submit"
            className=" bg-blue-300 hover:bg-blue-500 cursor-pointer mt-2 p-2 rounded-md shadow-xl"
          >
            REGISTER
          </button>
        </div>
      </Form>
    </div>
  );
}

export default SignUp;
