import img3 from '../assets/img3.jpg';
import { FaSearch } from 'react-icons/fa';
import { IoMdLogIn } from 'react-icons/io';
import { FaCartShopping } from 'react-icons/fa6';
import { logOutUser } from '../features/userSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchValue } from '../features/productSlice';
import { useState, useEffect } from 'react';
import { FaHouse, FaServicestack } from 'react-icons/fa6';
import { RxAvatar } from 'react-icons/rx';
import { FaArrowAltCircleDown } from 'react-icons/fa';
import { handleCart } from '../features/cartSlice';
import { SELLER_ACCESS, ADMIN_ACCESS, routes } from '../enums';

function Header() {
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isModal2Open, setModal2Open] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logOutUser());
    navigate(routes.HOME);
  };

  useEffect(() => {
    if (!user) return;
    dispatch(handleCart({ type: 'fetch', id: user.id }));
  }, [dispatch]);

  const searchValue = useSelector((state) => state.product.searchValue);
  const searchHandler = (e) => {
    dispatch(setSearchValue(e.target.value.trim()));
  };

  return (
    <div className="fixed w-full z-10 bg-gradient-to-br from-black to-white px-3 py-4 border-b text-sm border-stone-300">
      {user ? (
        <>
          <div className="flex items-center gap-2 md:hidden">
            {/* mobile */}
            <div className="text-white font-semibold text-lg">Logo</div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white text-2xl"
            >
              ☰
            </button>

            <div className="flex justify-center items-center  gap-1 flex-col">
              <NavLink
                to={routes.DASH_BOARD}
                className="p-0.5 bg-white/70 rounded-3xl "
              >
                {user.profile ? (
                  <img
                    src={user.profile}
                    alt="my profile"
                    className="w-10 h-10 rounded-full object-cover bg-stone-200 p-0.5"
                  />
                ) : (
                  <RxAvatar className="text-3xl " />
                )}
              </NavLink>
            </div>
          </div>

          {/* MOBILE DROPDOWN MENU */}
          {isOpen && (
            <div className="md:hidden mt-3 flex flex-col gap-3 text-white">
              <NavLink to={routes.HOME} className="hover:text-blue-300">
                Home
              </NavLink>
              <NavLink to={routes.HOME} className="hover:text-blue-300">
                Services
              </NavLink>
              <NavLink to={routes.HOME} className="hover:text-blue-300">
                About Us
              </NavLink>
              <NavLink to={routes.HOME} className="hover:text-blue-300">
                Contact Us
              </NavLink>

              {/* mobile */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={searchHandler}
                  placeholder="Search..."
                  className="w-full rounded-xl border border-sky-200 bg-black/20 p-2 text-white pl-10"
                />
              </div>
            </div>
          )}
          {/* laptop */}
          <div className="hidden md:flex items-center justify-between w-full">
            <div className="flex items-center  gap-8">
              <NavLink
                to={routes.HOME}
                className="text-white hover:border-b hover:border-white"
              >
                Home
              </NavLink>
              <NavLink
                to={routes.HOME}
                className="text-white hover:border-b hover:border-white"
              >
                Services
              </NavLink>

              <div
                className=" relative p-1 text-white  "
                onMouseLeave={() => setIsOpen(false)}
                onMouseEnter={() => setIsOpen(true)}
              >
                <span className=" p-1 font-extralight   hover:text-white hover:border-white   ">
                  About Us
                  <span className="pl-2 text-xs">{isOpen ? '▼' : '▲'}</span>
                </span>

                {isOpen && (
                  <div className="absolute  bg-black/40 backdrop-blur rounded shadow-md  p-1 text-white font-light flex flex-col   ">
                    <NavLink className="hover:border-b px-1">
                      Contact Us
                    </NavLink>
                    <NavLink className="hover:border-b  px-1 flex ">
                      Location
                    </NavLink>
                  </div>
                )}
              </div>
            </div>

            {/* SEARCH BAR */}
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
                      <FaCartShopping />
                      {!isActive && cart.length > 0 && (
                        <span className="absolute -top-1 -right-2 text-xs bg-sky-500 text-white w-4 h-4 flex items-center justify-center rounded-full">
                          {cart.length}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              )}

              <div
                onMouseEnter={() => setIsModalOpen(true)}
                onMouseLeave={() =>
                  setTimeout(() => setIsModalOpen(false), 5000)
                }
                className="relative inline-block  p-1"
              >
                <div className="flex justify-center items-center  gap-1 flex-col">
                  <NavLink
                    to={routes.DASH_BOARD}
                    className="p-0.5 bg-white/70 rounded-3xl "
                  >
                    {user.profile ? (
                      <img
                        src={user.profile}
                        alt="my profile"
                        className="w-10 h-10 rounded-3xl object-cover bg-stone-200 p-0.5"
                      />
                    ) : (
                      <RxAvatar className="text-3xl" />
                    )}
                  </NavLink>
                </div>

                {isModalOpen && (
                  <div className="absolute right-0 mt-2 bg-black/40 backdrop-blur p-3 rounded text-white flex flex-col gap-2">
                    <button
                      onClick={logoutHandler}
                      className="hover:text-blue-300"
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
      ) : (
        <>
          <div className="hidden md:flex flex-wrap items-center justify-between ">
            <div
              className=" relative p-1 text-white "
              onMouseLeave={() => setIsOpen(false)}
              onMouseEnter={() => setIsOpen(true)}
            >
              <span className=" p-1 font-extralight   px-4 -2   ">
                Home
                <span className="pl-2 text-xs">{isOpen ? '▼' : '▲'}</span>
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
                placeholder="Search here..."
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
                className="border-none p-0.5 font-light text-xs max-w-15 rounded-xl w-25 bg-gradient-to-tr from-blue-300 to-stone-300 outline-none  transition-transform duration-900 ease-in hover:translate-x-1  cursor-pointer text-center"
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
          <div className="flex items-center justify-between gap-2 md:hidden">
            <div className="flex ">
              <div className="text-white font-semibold text-lg">Logo</div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white text-2xl"
              >
                ☰
              </button>
            </div>
            <div>
              <NavLink
                to={routes.CART}
                className=" font-light hover:text-stone-300 text-2xl"
              >
                <FaCartShopping />
              </NavLink>
            </div>
            <div className=" relative px-4 flex justify-center w-1/2 items-center bg-yellow-400 ">
              <button onClick={() => setModal2Open(!isModal2Open)}>
                login
              </button>
              {isModal2Open && (
                <div className=" absolute flex flex-col items-center text-xs backdrop-blur top-5 bg-black/50 p-2 w-full   text-white">
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
        </>
      )}
    </div>
  );
}

export default Header;
