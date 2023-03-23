import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Portal from './pages/Portal';

export const ROUTER = {
  BASE: '/',
  PORTAL: '/portal',
  LOGIN: '/login'
} as const;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />}>
      <Route path={ROUTER.LOGIN} element={<Login />} />
      <Route path={ROUTER.PORTAL} element={<Portal />} />
      <Route path="*" element={<>404</>} />
    </Route>
  )
);

export default router;
