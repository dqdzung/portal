import { useAuth } from '@/hooks/useAuth';
import { ROUTER } from '@/router';
import { Navigate, useOutlet } from 'react-router-dom';

function BaseLayout() {
  const outlet = useOutlet();
  const { currentUser: user } = useAuth();

  if (user) {
    return <Navigate to={ROUTER.PORTAL} replace />;
  }

  return <div className="app-container">{outlet}</div>;
}

export default BaseLayout;
