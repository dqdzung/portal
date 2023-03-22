import { LoginUser, User } from '@/models/user';
import { api } from '@/services';
import { Callback } from '@/services/type';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const user = Cookies.get('user');
    setCurrentUser(user || null);
  }, []);

  const login = (payload: LoginUser, cb?: Callback) => {
    api.access
      .login(payload)
      .then((res) => {
        setCurrentUser(res.data.data);
        Cookies.set('user', res.data.data);
        cb?.onSuccess?.();
      })
      .catch((error) => {
        cb?.onError?.(error);
      })
      .finally(cb?.onFinally);
  };

  const logout = () => {
    // TODO: logout logic
    setCurrentUser(null);
  };

  const loginWithToken = (cb?: Callback) => {
    const token = Cookies.get('RefreshToken');
    if (!token) {
      cb?.onFinally?.();
      return;
    }
    api.access
      .refresh(token)
      .then((res) => {
        setCurrentUser(res.data.data);
        Cookies.set('user', res.data.data);
        cb?.onSuccess?.();
      })
      .catch((error) => {
        cb?.onError?.(error);
      })
      .finally(cb?.onFinally);
  };

  return { currentUser, setCurrentUser, login, logout, loginWithToken };
};
