import './App.css';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <AppRoutes />

      {/* <Routes>
        <Route path={routes.SIGN_UP} element={<SignUp />} />
        <Route path={routes.LOGIN} element={<LoginForm />} />

        <Route path={routes.USER_MANAGER} element={<UserManager />} />
        <Route path="/confirm" element={<CartConfirmation />} />
        <Route path={routes.REGISTER} element={<Register />} />
        <Route path="/address" element={<AddressForm />} />

        <Route element={<MainLayout />}>
          <Route
            path={routes.CART}
            element={
              <ProtectedRoute>
                <Carts />
              </ProtectedRoute>
            }
          />
          <Route path="/review" element={<ReviewProductCard />} />
          <Route path={routes.ADD_PRODUCT} element={<AddProductForm />} />
          <Route path="/" element={<ProductList />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes> */}
    </>
  );
}

export default App;
