import { Header, Group, MediaQuery, Image } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import pnkLogo from '@/assets/images/logo.svg';
import BurgerMenu from '@/components/BurgerMenu';
import UserNav from './UserNav';

export const HEADER_HEIGHT = 56;

const AppHeader = () => {
  const isLgScreen = useMediaQuery('(min-width: 990px');
  return (
    <Header
      height={HEADER_HEIGHT}
      p={isLgScreen ? '12px 200px 12px 200px' : 'sm'}
    >
      <Group sx={{ height: '100%' }} position="apart">
        <Image height={35} width="auto" src={pnkLogo} />
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <UserNav />
        </MediaQuery>

        <BurgerMenu />
      </Group>
    </Header>
  );
};
export default AppHeader;
