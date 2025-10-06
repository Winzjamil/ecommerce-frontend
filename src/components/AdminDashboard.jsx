import { Link, NavLink } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import { useContext } from 'react';
import { useAuth } from '../context/AuthContext';
function AdminDashboard() {
  const { user } = useAuth();
  const { userCount } = useContext(GlobalContext);
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-1.5 hover:text-underline">
          <NavLink to={'/'}>Home</NavLink>
          <NavLink to={'/userManager'}>User Manager</NavLink>
          <NavLink to={'/form'}>Product List</NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 shadow rounded">
            <p className="text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-blue-600">{userCount}</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <p className="text-gray-600">Orders</p>
            <p className="text-2xl font-bold text-green-600">145</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <p className="text-gray-600">Revenue</p>
            <p className="text-2xl font-bold text-purple-600">₱82,400</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <p className="text-gray-600">Pending Products</p>
            <p className="text-2xl font-bold text-orange-600">12</p>
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold mb-2">Recent Orders</h2>
          <p className="text-gray-500">Table or chart goes here...</p>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
