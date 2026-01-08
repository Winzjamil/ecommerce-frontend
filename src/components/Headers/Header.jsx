import { useNavigate } from 'react-router-dom';
import { routes, getAuthData } from '../../enums';
import WithUserHeader from '../Cards/WithUserHeader';
import { useSelector, useDispatch } from 'react-redux';
import WithoutUserHeader from '../Cards/WithoutUserHeader';
import { logOutUser } from '../../features/auth/userSlice';
import { setSearchValue } from '../../features/productSlice';
import {
  useGetCartQuery,
  useLogoutUserMutation,
} from '../../features/shop/shopApi';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = getAuthData('user');

  const { data: cart = [] } = useGetCartQuery();
  const [logout] = useLogoutUserMutation();

  const logoutHandler = async () => {
    dispatch(logOutUser());
    navigate(routes.HOME);
    await logout().unwrap();
  };

  const searchValue = useSelector((state) => state.product.searchValue);
  const searchHandler = (e) => {
    dispatch(setSearchValue(e.target.value.trim()));
  };

  return (
    <div className="fixed w-full z-10  bg-indigo-500 px-3 py-4 border-b text-sm border-stone-500">
      {user ? (
        <WithUserHeader
          user={user}
          logoutHandler={logoutHandler}
          searchHandler={searchHandler}
          searchValue={searchValue}
          cart={cart}
        />
      ) : (
        <WithoutUserHeader
          searchHandler={searchHandler}
          searchValue={searchValue}
        />
      )}
    </div>
  );
}

export default Header;
