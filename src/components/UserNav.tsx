import { AuthContext } from '@/contexts/AuthContext';
import { useAuth } from '@/hooks/useAuth';
import { ROUTER } from '@/router';
import { Anchor, Button, Group, Text } from '@mantine/core';
import { forwardRef, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const UserNav = forwardRef<HTMLDivElement>((props, ref) => {
  const { user } = useContext(AuthContext);
  const { logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div ref={ref} {...props}>
      <Group>
        <Text size="xs" ff="PoppinsRegular">
          {user}
        </Text>
        <Button
          size="xs"
          variant="outline"
          onClick={() => {
            logout();
            navigate(ROUTER.LOGIN, {
              replace: true
            });
          }}
        >
          {t('button.logout')}
        </Button>
      </Group>
    </div>
  );
});
export default UserNav;
