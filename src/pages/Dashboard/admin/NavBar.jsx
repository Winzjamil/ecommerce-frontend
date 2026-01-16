import { NavLink } from 'react-router-dom';
import { routes } from '../../../enums';

function NavBar() {
  return (
    <>
      <NavLink
        to="/adminDashboard"
        className="p-1 rounded hover:bg-black/40 transition"
      >
        Users
      </NavLink>
      <NavLink to="orders" className="p-1 rounded hover:bg-black/40 ">
        Orders
      </NavLink>
      <NavLink className="p-1 rounded hover:bg-black/40 ">Activity</NavLink>
      <NavLink to="product" className="p-1 rounded hover:bg-black/40 ">
        Products
      </NavLink>
      <NavLink className="p-1 rounded hover:bg-black/40 ">User Manager</NavLink>
    </>
  );
}

export default NavBar;
