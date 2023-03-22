import { useAuth } from '@/hooks/useAuth';
import { ROUTER } from '@/router';
import { AppShell, createStyles } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Suspense, useEffect, useState } from 'react';
import { Navigate, useOutlet } from 'react-router-dom';
import Loading from './Loading';

const useStyles = createStyles(() => ({
  layout: {
    maxHeight: '100vh',
    maxWidth: '100vw',
    overflow: 'hidden',
    '& .mantine-AppShell-main': {
      height: '100vh',
      backgroundColor: '#F5F6FC'
    }
  }
}));

function ProtectedLayout() {
  const { classes } = useStyles();

  const outlet = useOutlet();
  const { currentUser: user } = useAuth();

  if (!user) {
    return <Navigate to={ROUTER.LOGIN} />;
  }

  return (
    <AppShell
      className={classes.layout}
      padding="md"
      // header={
      //   <AppHeader
      //     openNavbar={openNavbar}
      //     onClickBurger={() => setOpenNavbar((o) => !o)}
      //   />
      // }
    >
      <Suspense fallback={<Loading />}>{outlet}</Suspense>
    </AppShell>
  );
}

export default ProtectedLayout;
