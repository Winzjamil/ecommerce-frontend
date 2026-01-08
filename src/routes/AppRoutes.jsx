import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { layouts } from '../layouts';
import ProtectedRoute from './ProtectedRoutes';
import { routesList, loadPage } from '.';
import { Spin } from 'antd';
export default function AppRoutes() {
  const renderRoutes = (routes) =>
    routes.map(
      ({
        path,
        index,
        component,
        layout,
        protected: isProtected,
        roles,
        children,
      }) => {
        // to load the actual component
        const ActualComponent = component ? loadPage(component) : null;
        //to apply the main layout
        const Layout = layout ? layouts[layout] : ({ children }) => children;
        const element = ActualComponent ? (
          <Layout>
            {isProtected ? (
              <ProtectedRoute allowedRoles={roles}>
                <ActualComponent />
              </ProtectedRoute>
            ) : (
              <ActualComponent />
            )}
          </Layout>
        ) : (
          <Layout />
        );
        if (index && children?.length) {
          console.warn(
            `Index route "${
              path || '(no path)'
            }" should not have children. Ignoring children.`
          );
        }
        return (
          <Route
            key={path || index}
            path={path}
            index={index}
            element={element}
          >
            {!index && children && renderRoutes(children)}
            {/* recursive for nested routes */}
          </Route>
        );
      }
    );

  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center bg-stone-200">
          <Spin size="large" />
        </div>
      }
    >
      <Routes>{renderRoutes(routesList)}</Routes>
    </Suspense>
  );
}
