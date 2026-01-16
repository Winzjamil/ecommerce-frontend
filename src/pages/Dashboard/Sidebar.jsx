import Img from '../../components/Cards/Img';
import { NavLink } from 'react-router-dom';
import { getAuthData, SELLER_ACCESS } from '../../enums';
import { RxAvatar } from 'react-icons/rx';
import { ADMIN_ACCESS } from '../../enums';
import NavBar from './admin/NavBar';
function Sidebar() {
  const loginUser = getAuthData('user');
  // const user = useSelector((state) => state.auth);

  return (
    <aside className="w-full flex   h-screen text-white flex-col bg-stone-600 p-2 ">
      <div className="flex self-end w-full items-center text-xs max-w-25 gap-1 p-1  bg-gray-700 rounded ">
        {loginUser.profile ? (
          <Img img={loginUser.profile} />
        ) : (
          <RxAvatar size={20} />
        )}
        <div className=" flex flex-col p-1 border-l flex-wrap items-center ">
          <span>{loginUser?.userName || null}</span>
          <button className="bg-black/40 px-2 py-0.5 cursor-pointer rounded ">
            Edit
          </button>
        </div>
      </div>
      <nav className="w-full max-w-40 mt-20 text-center flex text-sm  flex-col gap-1">
        {loginUser && loginUser.role === ADMIN_ACCESS ? (
          <NavBar />
        ) : (
          <>
            <NavLink
              to="/dashboard"
              className="  p-1  rounded hover:bg-black/40 transition  "
            >
              Profile
            </NavLink>
            <NavLink
              to="orders"
              className="p-1 rounded hover:bg-black/40 transition "
            >
              Orders
            </NavLink>
            {loginUser.role === SELLER_ACCESS ? null : (
              <NavLink
                to="address"
                className=" p-1 rounded hover:bg-black/40 transition "
              >
                Address
              </NavLink>
            )}

            <NavLink className=" p-1 rounded hover:bg-black/40 transition ">
              Settings
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;
