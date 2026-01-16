import { IoMdLogIn } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import img1 from '../../assets/img1.jpg';
import { useState } from 'react';
import { FaCartShopping, FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { routes } from '../../enums';
import Img from './Img';
function WithoutUserHeader({ searchHandler, searchValue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  return (
    <div>
      <div className="hidden md:flex flex-wrap items-center justify-between ">
        <div
          className=" relative p-1 text-white "
          onMouseLeave={() => setIsOpen(false)}
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsOpen(true)}
        >
          <span className=" p-1 font-extralight flex items-center  px-4 -2   ">
            Home
            <span className="pl-2  text-xs">
              {isOpen ? <FaAngleDown /> : <FaAngleUp />}
            </span>
          </span>

          {isOpen && (
            <div className="absolute w-full text-sm bg-black/40 backdrop-blur rounded shadow-md  p-2 text-white font-light  flex flex-col   ">
              <NavLink
                to={routes.HOME}
                className="hover:border-b hover:border-b-white "
              >
                Home
              </NavLink>
              <NavLink className="hover:border-b hover:border-b-white ">
                Location
              </NavLink>

              <NavLink className="hover:border-b hover:border-b-white ">
                Services
              </NavLink>
              <NavLink className="hover:border-b hover:border-b-white ">
                Contact Us
              </NavLink>
            </div>
          )}
        </div>

        {/* SEARCH BAR */}
        <div className="relative w-full max-w-sm text-white text-sm">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
          <input
            type="text"
            value={searchValue}
            onChange={searchHandler}
            placeholder="Find your favorite..."
            className="w-full rounded-xl border border-sky-200 placeholder:text-white bg-black/20 outline-none pl-10 py-1"
          />
        </div>

        {/* RIGHT MENU */}
        <div className="flex items-center gap-6 text-white">
          <NavLink
            to={routes.REGISTER}
            className="font-xl p-0.5 text-xs bg-white text-black/30 font-light rounded-sm text-black hover:bg-gradient-to-tr from-blue-300 to-stone-300 hover:text-white"
          >
            Want to be with us!?
          </NavLink>
          <div>
            <NavLink
              to={routes.CART}
              className=" font-light hover:text-stone-300 text-2xl"
            >
              <FaCartShopping />
            </NavLink>
          </div>
          <NavLink
            to={routes.SIGN_UP}
            className="border-none p-0.5 font-light text-xs max-w-15 rounded-xl w-25 bg-gradient-to-tr from-blue-300 to-stone-300 shadow  transition-transform duration-900 ease-in hover:translate-x-1  cursor-pointer text-center"
          >
            Sign up
          </NavLink>
          <NavLink
            className="border-none p-0.5 font-light text-xs max-w-15 rounded-xl w-25 bg-gradient-to-tr from-blue-300 to-stone-300  transition-transform duration-900 ease-in hover:translate-x-1 cursor-pointer justify-center flex items-center gap-1.5"
            to={routes.LOGIN}
          >
            <span className="text-white">
              <IoMdLogIn />
            </span>
            Login
          </NavLink>
        </div>
      </div>
      {/* mobile */}
      <div className="flex items-center justify-between gap-2 md:hidden">
        <div className="flex text-white items-center gap-2">
          <Img img={img1} />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-2xl"
          >
            ☰
          </button>
        </div>
        {isOpen && (
          <div className="absolute top-[95%] w-full max-w-[30%] text-sm bg-black/40 backdrop-blur rounded shadow-md  p-2 text-white font-light  flex flex-col   ">
            <NavLink
              to={routes.HOME}
              className="hover:border-b hover:border-b-white "
            >
              Home
            </NavLink>
            <NavLink className="hover:border-b hover:border-b-white ">
              Location
            </NavLink>

            <NavLink className="hover:border-b hover:border-b-white ">
              Services
            </NavLink>
            <NavLink className="hover:border-b hover:border-b-white ">
              Contact Us
            </NavLink>
          </div>
        )}
        <div className="flex items-center flex-wrap gap-2">
          <NavLink to={routes.CART} className=" font-light text-stone-300 ">
            <FaCartShopping />
          </NavLink>

          <div className="text-white text-xs ">
            <button
              onClick={() => setIsModal2Open(!isModal2Open)}
              className="bg-black/50 text-xs py-1 px-1.5 rounded "
            >
              Login
            </button>

            {isModal2Open && (
              <div className="absolute flex flex-col items-center text-xs backdrop-blur top-[74%] right-[3.5%] bg-black/50 p-2  rounded-b  text-white">
                <NavLink to={routes.REGISTER}>Want to be with us!?</NavLink>
                <NavLink to={routes.SIGN_UP}>Sign up</NavLink>
                <NavLink
                  to={routes.LOGIN}
                  className="flex flex-wrap items-center justify-center w-full"
                >
                  <span className="text-white">
                    <IoMdLogIn />
                  </span>
                  Login
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithoutUserHeader;
