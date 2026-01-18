import { NavLink } from 'react-router-dom';
import { routes } from '../../../enums';
import { useState } from 'react';

function NavBar() {
  return (
    <>
      <div className="hidden md:flex flex-col">
        <NavLink to="/adminDashboard" className="p-2 hover:bg-black/40">
          Users
        </NavLink>
        <NavLink to="orders" className="p-2 hover:bg-black/40">
          Orders
        </NavLink>
        <NavLink className="p-2 hover:bg-black/40">Activity</NavLink>
        <NavLink to="product" className="p-2 hover:bg-black/40">
          Products
        </NavLink>
        <NavLink className="p-2 hover:bg-black/40">User Manager</NavLink>
      </div>
    </>
  );
}

export default NavBar;
