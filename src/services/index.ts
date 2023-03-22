import i18n from '@/locales/i18n';

import { showNotification } from '@mantine/notifications';
import Cookies from 'js-cookie';
import { Api } from './api';

export const api = new Api({
  baseUrl: `/api/v1`,
  securityWorker: (token) =>
    token ? { headers: { authorization: `Bearer ${token}` } } : {},
  securityErrorHandler: () => {
    const user = Cookies.get('user');
    if (user) {
      showNotification({
        color: 'red',
        message: i18n.t('message.refresh')
      });
    }
  }
});

export const waitingBuffer = (ms = 0) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
