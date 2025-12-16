import React from 'react';

function Sidebar() {
  return (
    <div className="text-white mt-2 ">
      <aside className="w-50 min-h-screen bg-stone-800 text-md p-4 ">
        <div className=" absolute flex   gap-2 ">
          <img src="" alt="" className="w-10 h-10 rounded-full" />
          <div className=" flex items-center text-sm flex-col  ">
            <p>namesdsd</p>
            <p>edit</p>
            {/* <button className="bg-red-300 ">Edit</button> */}
          </div>
        </div>
        <nav className="mt-4 bg-green-300">
          <div>Account</div>
          <button className="block w-full text-left hover:text-blue-400">
            Orders
          </button>
          <button className="block w-full text-left hover:text-blue-400">
            Notification
          </button>
          <button className="block w-full text-left hover:text-blue-400">
            Vauchers
          </button>
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
