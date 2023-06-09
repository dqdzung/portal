import { AuthContext } from '@/contexts/AuthContext';
import { useAuth } from '@/hooks/useAuth';
import { ROUTER } from '@/router';
import { showNotification } from '@mantine/notifications';
import { Suspense, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useOutlet } from 'react-router-dom';
import Loading from './Loading';

function AuthLayout() {
  const navigate = useNavigate();
  const outlet = useOutlet();
  const { t } = useTranslation();
  const { loginWithToken } = useAuth();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate(ROUTER.PORTAL, {
        replace: true
      });
      return;
    }

    navigate(ROUTER.LOGIN, {
      replace: true
    });
    setLoading(true);
    loginWithToken({
      onSuccess: () => {
        navigate(ROUTER.PORTAL, {
          replace: true
        });
      },
      onError: () => {
        showNotification({
          color: 'red',
          message: t('message.refresh')
        });
      },
      onFinally: () => {
        setLoading(false);
      }
    });
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return <Suspense fallback={<Loading />}>{outlet}</Suspense>;
}

export default AuthLayout;
