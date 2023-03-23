import { AppShell } from '@mantine/core';

import AppFooter from '@/components/AppFooter';
import AppHeader, { HEADER_HEIGHT } from '@/components/AppHeader';
import SearchBanner from '@/components/SearchBanner';
import AppMain from '@/components/AppMain';
import StatsBanner from '@/components/StatsBanner';

const Portal = () => {
  return (
    <AppShell
      p={0}
      sx={{
        '& .mantine-AppShell-main': {
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: HEADER_HEIGHT
        }
      }}
      header={<AppHeader />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0]
        }
      })}
      footer={<AppFooter />}
    >
      <SearchBanner />

      <AppMain />

      <StatsBanner />
    </AppShell>
  );
};

export default Portal;
