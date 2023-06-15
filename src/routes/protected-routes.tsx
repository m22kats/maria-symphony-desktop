import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signInSelector } from '@redux/slices/auth/sign-in/sign-in.selector';

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const isSignIn = useSelector(signInSelector.isSignIn);

  useEffect(() => {
    if (!isSignIn) {
      navigate('/sign-in');
    }
  }, [isSignIn, navigate]);

  return isSignIn ? <Outlet /> : null;
};
export default ProtectedRoutes;
