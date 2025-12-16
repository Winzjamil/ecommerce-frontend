import DashBoardStyle from './DashboardStyle';
import Sidebar from './sidebar/Sidebar';
import ProductList from '../../pages/ProductList';
function Dashboard() {
  return (
    <DashBoardStyle>
      <Sidebar />
      <div className="">
        <ProductList />
      </div>
    </DashBoardStyle>
  );
}

export default Dashboard;
