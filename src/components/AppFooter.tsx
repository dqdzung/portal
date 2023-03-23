import { useMantineTheme, Footer, Group, Image, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { HEADER_HEIGHT } from './AppHeader';
import pdtLogo from '@/assets/images/pdt-logo-light.png';

const AppFooter = () => {
  const isLgScreen = useMediaQuery('(min-width: 990px');
  const theme = useMantineTheme();
  return (
    <Footer height={HEADER_HEIGHT} withBorder={false}>
      <Group
        sx={{
          height: HEADER_HEIGHT,
          backgroundColor: theme.colors['dark-blue'][6],
          border: 0
        }}
        position="apart"
        p={isLgScreen ? '12px 200px 12px 200px' : 'sm'}
      >
        <Image height={32} width="auto" src={pdtLogo} />
        <Text color="#FFFFFF" fz="12px" ff="PoppinsRegular">
          © {new Date().getFullYear()}. PDT. All Rights Reserved
        </Text>
      </Group>
    </Footer>
  );
};
export default AppFooter;
