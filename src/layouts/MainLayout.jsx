import { Outlet } from 'react-router-dom';
import Header from '../components/Headers/Header';
function MainLayout({ children }) {
  return (
    <div>
      <Header />

      <main className="pt-12">{children || <Outlet />}</main>
    </div>
  );
}

export default MainLayout;
