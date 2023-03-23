import { AuthContext } from '@/contexts/AuthContext';
import { Text } from '@mantine/core';
import { forwardRef, useContext } from 'react';

const UserNav = forwardRef<HTMLDivElement>((props, ref) => {
  const { user } = useContext(AuthContext);
  return (
    <div ref={ref} {...props}>
      <Text size="sm" ff="PoppinsRegular">
        {user}
      </Text>
    </div>
  );
});
export default UserNav;
