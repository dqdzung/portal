import { AppShell } from '@mantine/core';

import AppFooter from '@/components/AppFooter';
import AppHeader, { HEADER_HEIGHT } from '@/components/AppHeader';
import SearchBanner from '@/components/SearchBanner';
import AppMain from '@/components/AppMain';

const Portal = () => {
  return (
    <AppShell
      p={0}
      sx={{
        '& .mantine-AppShell-main': {
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: HEADER_HEIGHT,
          paddingBottom: HEADER_HEIGHT
        }
      }}
      header={<AppHeader />}
      footer={<AppFooter />}
    >
      <SearchBanner />

      <AppMain />
    </AppShell>
  );
};

export default Portal;
