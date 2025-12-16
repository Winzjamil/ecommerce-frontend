import { Suspense } from 'react';
import { loadPage } from '.';
import { Routes, Route } from 'react-router-dom';
import { layouts } from '../layouts';
import ProtectedRoute from './ProtectedRoutes';
import { routesList } from '.';
import { Spin } from 'antd';
export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center bg-stone-600">
          <Spin size="large" />
        </div>
      }
    >
      <Routes>
        {routesList.map(
          ({ path, component, layout, protected: isProtected, roles }) => {
            const ActualComponent = loadPage(component);
            const Layout = layout
              ? layouts[layout]
              : ({ children }) => children;

            const element = (
              <Layout>
                {isProtected ? (
                  <ProtectedRoute allowedRoles={roles}>
                    <ActualComponent />
                  </ProtectedRoute>
                ) : (
                  <ActualComponent />
                )}
              </Layout>
            );
            return <Route key={path} path={path} element={element} />;
          }
        )}
      </Routes>
    </Suspense>
  );
}
