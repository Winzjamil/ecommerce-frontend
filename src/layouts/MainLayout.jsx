import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
function MainLayout({ children }) {
  return (
    <div>
      <Header />

      <main>{children || <Outlet />}</main>
    </div>
  );
}

export default MainLayout;
