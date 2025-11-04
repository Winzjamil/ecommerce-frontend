import ProtectedRoute from './routes/ProtectedRoutes';
import AddProductForm from './components/AddProductForm';
// import { GlobalContextProvider } from './context/GlobalContext';
// import { AuthContextProvider } from './context/AuthContext';
import AdminDashboard from './components/AdminDashboard';
import LoginForm from './components/LoginForm';
import Product from './components/Product';
import SignUp from './components/Signup';
import UserManager from './components/UserManager';
import { Route, Routes } from 'react-router-dom';
import Carts from './components/Carts';
import './App.css';
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/carts"
          element={
            <ProtectedRoute>
              <Carts />
            </ProtectedRoute>
          }
        />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/userManager" element={<UserManager />} />
        <Route path="/form" element={<AddProductForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;
