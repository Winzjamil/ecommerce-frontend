import React from 'react';
import { lazy } from 'react';
import { routes, USER, SELLER_ACCESS } from '../enums';
const pages = import.meta.glob('../pages/**/*.jsx');
console.log('pages', pages);

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
    path: routes.REVIEW,
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
  { path: routes.LOGIN, component: 'LoginForm' },
  { path: routes.SIGN_UP, component: 'Signup' },
  { path: routes.REGISTER, component: 'Register' },
];
