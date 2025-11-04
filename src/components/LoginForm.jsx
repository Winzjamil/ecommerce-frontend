import { FaEyeSlash, FaEye, FaArrowLeft } from 'react-icons/fa6';
import { userAuth } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoMdLogIn } from 'react-icons/io';
import useForm from './Hooks';
import Input from './Input';
import Form from './Form';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData, changeHandler, submitHandler } = useForm({
    initialVal: { email: '', password: '' },
    onSubmit: async (formData) => {
      try {
        const result = await dispatch(
          userAuth({ type: 'login', credentials: formData })
        ).unwrap();

        alert(
          result.message,
          `Name: ${result.user.fullName} Role: ${result.user.role}`
        );
        if (result.user.role === 'user') {
          navigate('/');
        } else {
          navigate('/adminDashboard');
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
    <div className="fixed inset-0 bg-purple-300 flex gap-1 p-2.5 justify-center  items-center">
      <div>
        <button
          onClick={() => {
            navigate('/');
          }}
          className="cursor-pointer"
        >
          <FaArrowLeft />
        </button>
        <Form onSubmit={submitHandler} header="Fill up form to continue ">
          <Input
            name="email"
            type="email"
            id="Email"
            value={formData.email}
            label="Email"
            required
            onChange={changeHandler}
            autoComplete="on"
          />
          <div className="relative w-72">
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={formData.password}
              onChange={changeHandler}
              label="Password"
              required
              autoComplete="password"
            />
            <span
              onClick={showPasswordHandler}
              className="absolute right-3 top-1/2 pt-1 text-gray-700"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div className="flex items-center flex-col">
            <button
              type="submit"
              className=" flex flex-wrap items-center cursor-pointer gap-1 bg-blue-300 hover:bg-blue-500 p-1.5 rounded-lg shadow-xl"
            >
              <IoMdLogIn />
              Login
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
// try {
//   const res = await fetch('http://localhost:8080/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(formData),
//   });
//   const data = await res.json();
//   // to save user to local storage
//   loginUser(data.user);

//   alert(`Login success: ${data.user.fullName} - Role: ${data.user.role}`);
//   if (data.user.role === 'user') {
//     navigate('/');
//   } else if (data.user.role === 'admin') {
//     navigate('/adminDashboard');
//   }
// } catch (err) {
//   console.error('logging in failed', err);
// }
