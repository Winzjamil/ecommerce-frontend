import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
function DashBoardStyle() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="fixed top-[10%] left-0 h-screen w-[18%]">
        <Sidebar />
      </div>

      <div className="ml-[18%] w-[82%] h-screen overflow-y-auto mt-5">
        <Outlet />
      </div>
    </div>
  );
}

export default DashBoardStyle;
