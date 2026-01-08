import './App.css';
import AppRoutes from './routes/AppRoutes';
import UserList from './pages/Dashboard/admin/UserList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <>
      <Routes>
        <Route path="users" element={<UserList />} />
      </Routes>
      <AppRoutes />
    </>
  );
}

export default App;
