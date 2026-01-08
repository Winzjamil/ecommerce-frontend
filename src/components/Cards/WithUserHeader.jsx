import Img from './Img';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { RxAvatar } from 'react-icons/rx';
import img1 from '../..//assets/img1.jpg';
import { NavLink } from 'react-router-dom';
import { SELLER_ACCESS, ADMIN_ACCESS, routes } from '../../enums';

import {
  FaHouse,
  FaServicestack,
  FaAngleDown,
  FaAngleUp,
  FaCartShopping,
} from 'react-icons/fa6';
function WithUserHeader({
  user,
  searchValue,
  searchHandler,
  logoutHandler,
  cart,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between text-white gap-2 md:hidden">
        {/* mobile */}
        <div className="flex items-center gap-2">
          <Img img={img1} />
          <button onClick={() => setIsOpen(!isOpen)}>☰</button>
        </div>

        <div className="flex justify-center items-center text-xs gap-4   ">
          <NavLink
            to={routes.CART}
            className={({ isActive }) =>
              `relative text-2xl ${isActive ? 'border-b' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <FaCartShopping className="text-white text-xs" />
                {!isActive && cart.length > 0 && (
                  <span className="absolute top-[3%] translate-x-2 text-xs bg-sky-500 text-white w-4 h-4 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </>
            )}
          </NavLink>
          <NavLink
            to={routes.DASH_BOARD}
            className="p-0.5 bg-white/70 rounded-full "
          >
            {user.profile ? <Img img={user.profile} /> : <RxAvatar />}
          </NavLink>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}

      {isOpen && (
        <div className="md:hidden w-full text-xs mt-3 flex flex-wrap gap-3 text-white">
          {user.role === SELLER_ACCESS ? (
            <NavLink
              to={routes.ADD_PRODUCT}
              className={({ isActive }) =>
                isActive
                  ? 'text-white border-b border-white flex gap-1 items-center'
                  : 'hover:text-blue-300'
              }
            >
              Home
            </NavLink>
          ) : (
            <NavLink
              to={routes.HOME}
              className={({ isActive }) =>
                isActive
                  ? 'text-white border-b border-white flex gap-1 items-center'
                  : 'hover:text-blue-300'
              }
            >
              Home
            </NavLink>
          )}
          <NavLink className="hover:text-blue-300">Services</NavLink>
          <NavLink className="hover:text-blue-300">About Us</NavLink>
          <NavLink className="hover:text-blue-300">Contact Us</NavLink>

          {/* mobile */}

          <div className="relative text-xs">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white " />
            <input
              type="text"
              value={searchValue}
              onChange={searchHandler}
              placeholder="Search..."
              className="w-full rounded-xl border border-sky-200 bg-black/20placeholder:text-white bg-black/20 outline-none p-0.5 text-white pl-10"
            />
          </div>
        </div>
      )}
      {/* laptop */}
      <div className="hidden md:flex items-center justify-between  w-full">
        <div className="flex items-center  gap-8">
          {user.role === SELLER_ACCESS ? (
            <NavLink
              to={routes.ADD_PRODUCT}
              className={({ isActive }) =>
                isActive
                  ? 'text-white border-b border-white flex gap-1 items-center'
                  : 'text-white hover:border-b hover:border-white flex gap-1 items-center'
              }
            >
              <FaHouse className="text-sky-200" /> Home
            </NavLink>
          ) : (
            <NavLink
              to={routes.HOME}
              className={({ isActive }) =>
                isActive
                  ? 'text-white border-b border-white flex gap-1 items-center'
                  : 'text-white hover:border-b hover:border-white flex gap-1 items-center'
              }
            >
              <FaHouse className="text-sky-200" /> Home
            </NavLink>
          )}
          <NavLink className="text-white hover:border-b hover:border-white">
            Services
          </NavLink>

          <div
            className=" relative p-1 text-white  "
            onMouseLeave={() => setIsOpen(false)}
            onMouseEnter={() => setIsOpen(true)}
          >
            <span className=" p-1 font-extralight flex items-center  hover:text-white hover:border-white   ">
              About Us
              <span className="  pl-2 text-xs">
                {isOpen ? <FaAngleDown /> : <FaAngleUp />}
              </span>
            </span>

            {isOpen && (
              <div className="absolute  bg-black/40 backdrop-blur rounded shadow-md  p-1 text-white font-light flex flex-col   ">
                <NavLink className="hover:border-b px-1">Contact Us</NavLink>
                <NavLink className="hover:border-b  px-1 flex ">
                  Location
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {/* SEARCH BAR */}
        {user.role === SELLER_ACCESS ? null : (
          <div className="relative w-full max-w-sm text-white">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 " />
            <input
              type="text"
              value={searchValue}
              onChange={searchHandler}
              placeholder="Search here..."
              className="w-full rounded-xl border border-sky-200 placeholder:text-white bg-black/20 outline-none pl-10 py-1"
            />
          </div>
        )}

        {/* RIGHT MENU */}
        <div className="flex items-center gap-6 ">
          {user.role === SELLER_ACCESS ? null : (
            <NavLink
              to={routes.CART}
              className={({ isActive }) =>
                `relative text-2xl ${isActive ? 'border-b' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <FaCartShopping className="text-white" />
                  {!isActive && cart.length > 0 && (
                    <span className="absolute top-[3%] translate-x-2 text-xs bg-sky-500 text-white w-4 h-4 flex items-center justify-center rounded-full">
                      {cart.length}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          )}

          <div
            onMouseEnter={() => setIsModalOpen(true)}
            onMouseLeave={() => setTimeout(() => setIsModalOpen(false), 5000)}
            className="relative inline-block "
          >
            <div className="flex justify-center items-center  gap-1 flex-col">
              <NavLink
                to={routes.DASH_BOARD}
                className="p-0.5 bg-white/70 rounded-3xl "
              >
                {user.profile ? (
                  <Img img={user.profile} />
                ) : (
                  <RxAvatar className="text-lg" />
                )}
              </NavLink>
            </div>

            {isModalOpen && (
              <div className="absolute right-0 mt-2 bg-black/40 backdrop-blur p-3 rounded text-white flex flex-col gap-2">
                <button
                  onClick={() => logoutHandler()}
                  className="hover:text-blue-300 cursor-pointer"
                >
                  Logout
                </button>
                <p>Settings</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default WithUserHeader;
