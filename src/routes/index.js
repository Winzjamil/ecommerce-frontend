import { lazy } from 'react';
import { routes, USER, SELLER_ACCESS, ADMIN_ACCESS } from '../enums';
const pages = import.meta.glob('../pages/**/*.jsx');

export const loadPage = (name) => {
  const importer = pages[`../pages/${name}.jsx`];
  if (!importer) throw new Error(`Page "${name}" not found`);
  // return lazy(() => importer());
  return lazy(() =>
    importer().then((module) => ({
      default: module.default || module[name],
    }))
  );
};

export const routesList = [
  { path: routes.HOME, component: 'ProductList', layout: 'MainLayout' },
  {
    path: routes.ADDRESS,
    component: 'Dashboard/user_info/Address',
    layout: 'MainLayout',
    protected: true,
    roles: [USER],
  },

  {
    path: '/dashboard',
    component: 'Dashboard/DashBoardStyle',
    layout: 'MainLayout',
    protected: true,
    roles: [SELLER_ACCESS, USER],
    children: [
      { index: true, component: 'Dashboard/user_info/Profile' },

      {
        path: 'address',
        component: 'Dashboard/user_info/Address',
      },

      {
        path: 'orders',
        component: 'Dashboard/user_info/Orders',
      },
    ],
  },
  {
    path: '/adminDashboard',
    component: 'Dashboard/DashBoardStyle',
    layout: 'MainLayout',
    protected: true,
    roles: [ADMIN_ACCESS],
    children: [{ index: true, component: 'Dashboard/admin/UserList' }],
  },

  {
    path: `${routes.REVIEW}/:id`,
    component: 'ReviewProduct',
    layout: 'MainLayout',
  },
  {
    path: routes.ADDRESS_FORM,
    component: 'AddressForm',
    layout: 'MainLayout',
    protected: true,
    roles: [USER],
  },
  {
    path: routes.CART,
    component: 'Carts',
    layout: 'MainLayout',
    protected: true,
    roles: [USER],
  },
  {
    path: routes.ADD_PRODUCT,
    component: 'AddProductForm',
    layout: 'MainLayout',
    protected: true,
    roles: [SELLER_ACCESS],
  },

  // local routes or general
  { path: routes.LOGIN, component: 'LoginForm' },
  { path: routes.SIGN_UP, component: 'Signup' },
  { path: routes.REGISTER, component: 'Register' },
];
