import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <>
      <NavLink className="p-1 rounded hover:bg-black/40 transition">
        Users
      </NavLink>
      <NavLink className="p-1 rounded hover:bg-black/40 ">Orders</NavLink>
      <NavLink className="p-1 rounded hover:bg-black/40 ">Activity</NavLink>
      <NavLink className="p-1 rounded hover:bg-black/40 ">Products</NavLink>
      <NavLink className="p-1 rounded hover:bg-black/40 ">User Manager</NavLink>
    </>
  );
}

export default NavBar;
