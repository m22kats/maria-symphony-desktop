import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './protected-routes';
import EntityList from '@pages/entity/entity-list/entity-list';
import EntityCreate from '@pages/entity/entity-create/entity-create';
import SignIn from '@pages/auth/sign-in';
import SignUp from '@pages/auth/sign-up';
import { useSelector } from 'react-redux';
import { signInSelector } from '@redux/slices/auth/sign-in/sign-in.selector';
import NavigationBar from '@shared/layout/navigation-bar';

function RouteList() {
  const isSignIn = useSelector(signInSelector.isSignIn);

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route
          path="/sign-in"
          element={isSignIn ? <Navigate to="/entity" /> : <SignIn />}
        />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<EntityList />} />
          <Route path="/entity" element={<EntityList />} />
          <Route path="/entity/:id/create" element={<EntityCreate />} />
          <Route path="*" element={<Navigate to="/entity" />} />
        </Route>
        <Route
          path="/sign-up"
          element={isSignIn ? <Navigate to="/entity" /> : <SignUp />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default RouteList;
