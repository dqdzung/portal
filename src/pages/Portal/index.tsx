import {
  ActionIcon,
  AppShell,
  BackgroundImage,
  Box,
  Burger,
  Button,
  createStyles,
  Footer,
  Group,
  Header,
  Image,
  MediaQuery,
  Paper,
  rem,
  Stack,
  Text,
  TextInput,
  TextProps,
  Transition,
  useMantineTheme
} from '@mantine/core';
import pnkLogo from '@/assets/images/logo.svg';
import pdtLogo from '@/assets/images/pdt-logo-light.png';
import banner from '@/assets/images/banner.png';
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { useDisclosure, useElementSize, useMediaQuery } from '@mantine/hooks';
import { GlobalDataContext } from '@/contexts/GlobalDataContext';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

const HEADER_HEIGHT = 56;

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
    </AppShell>
  );
};

export default Portal;

export const AppHeader = () => {
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

export const AppFooter = () => {
  const isLgScreen = useMediaQuery('(min-width: 990px');
  const theme = useMantineTheme();
  return (
    <Footer
      height={HEADER_HEIGHT}
      p={isLgScreen ? '12px 200px 12px 200px' : 'sm'}
      sx={{ backgroundColor: theme.colors['dark-blue'][6] }}
    >
      <Group sx={{ height: '100%' }} position="apart">
        <Image height={32} width="auto" src={pdtLogo} />
        <Text color="#FFFFFF" fz="12px" ff="PoppinsRegular">
          © {new Date().getFullYear()}. PDT. All Rights Reserved
        </Text>
      </Group>
    </Footer>
  );
};

export const BurgerMenu = () => {
  const { user } = useContext(AuthContext);
  const { classes } = useStyles();
  const [opened, { toggle, close }] = useDisclosure(false);
  return (
    <>
      <Burger
        opened={opened}
        onClick={toggle}
        className={classes.burger}
        size="sm"
      />
      <Transition transition="pop-top-right" duration={200} mounted={opened}>
        {(styles) => (
          <Paper className={classes.dropdown} withBorder style={styles}>
            <a
              key={user}
              className={classes.link}
              onClick={(event) => {
                event.preventDefault();
                close();
              }}
            >
              <UserNav />
            </a>
          </Paper>
        )}
      </Transition>
    </>
  );
};

export const UserNav = forwardRef<HTMLDivElement>((props, ref) => {
  const { user } = useContext(AuthContext);
  return (
    <div ref={ref} {...props}>
      <Text size="sm" ff="PoppinsRegular">
        {user}
      </Text>
    </div>
  );
});

export const SearchBanner = () => {
  const { t } = useTranslation();
  const isLgScreen = useMediaQuery('(min-width: 990px');

  const textStyle: TextProps = {
    ff: 'SFProRoundedMedium',
    size: isLgScreen ? 40 : 25,
    transform: 'capitalize'
  };

  return (
    <Stack h={'403px'}>
      <BackgroundImage src={banner} h="100%">
        <Box px={isLgScreen ? 200 : 'sm'} pt={95}>
          <Text
            {...textStyle}
            variant="gradient"
            gradient={{
              from: '#FBB54D 0%',
              to: '#FB824D 85.42%',
              deg: 90
            }}
          >
            {t('pageName')}
          </Text>
          <Text {...textStyle} ff="SFProRoundedRegular" color="#FFFFFF">
            {t('schoolName')}
          </Text>

          <Group
            mt={48}
            w={'50%'}
            p={10}
            sx={{ background: '#FFFFFF', borderRadius: 8 }}
          >
            <TextInput
              sx={{ flex: '1 !important' }}
              variant="unstyled"
              placeholder={t('placeholder.search', { value: t('app') })}
            />
            <Button radius={6} ff="PoppinsRegular" fz="sm">
              {t('button.search')}
            </Button>
          </Group>
        </Box>
      </BackgroundImage>
    </Stack>
  );
};

const useStyles = createStyles((theme) => ({
  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },
  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0]
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md
    }
  }
}));

interface ScrollContextData {
  appWidth: number;
  scrollWidth: number;
  setWidth?: (data: any) => void;
  scrollRef?: any;
  setScrollRef?: (data: any) => void;
}

export const ScrollContext = createContext<ScrollContextData>({
  appWidth: 0,
  scrollWidth: 0,
  setWidth: (data: any) => {},
  scrollRef: null,
  setScrollRef: (data: any) => {}
});

export const AppMain = () => {
  const isLgScreen = useMediaQuery('(min-width: 990px');
  const { ref, width } = useElementSize();
  const [widthData, setWidthData] = useState<ScrollContextData>({
    appWidth: 0,
    scrollWidth: 0
  });

  return (
    <Stack
      w="100%"
      sx={{ overflow: 'hidden' }}
      px={isLgScreen ? 200 : 'sm'}
      mt={64}
      ref={ref}
    >
      <ScrollContext.Provider
        value={{
          ...widthData,
          appWidth: width,
          setWidth: setWidthData
        }}
      >
        <ScrollContainer />
      </ScrollContext.Provider>
    </Stack>
  );
};

export const ScrollContainer = () => {
  const { t } = useTranslation();

  const globalData = useContext(GlobalDataContext);
  const [active, setActive] = useState(0);
  const { ref, width } = useElementSize();

  const { setWidth, setScrollRef, appWidth } = useContext(ScrollContext);

  const handleClick = (type: 'prev' | 'next') => {};

  useEffect(() => {
    setWidth?.((prev: ScrollContextData) => ({ ...prev, scrollWidth: width }));
    // setScrollRef?.(ref.current);
  }, [width, ref]);

  // console.log(ref.current);

  return (
    <Box pos="relative" sx={{ overflow: 'hidden' }}>
      <Group noWrap ref={ref} miw="max-content">
        <Button
          h={40}
          miw={72}
          p={'9.5px 16px 9.5px 16px'}
          color={active === 0 ? 'dark-blue' : 'gray.3'}
          c={active === 0 ? 'white' : 'rgba(162, 163, 168, 1)'}
          onClick={() => setActive(0)}
          sx={{
            borderTopLeftRadius: '4px !important',
            borderBottomLeftRadius: '4px !important',
            ...(active !== 0 && {
              borderTopRightRadius: '4px !important',
              borderBottomRightRadius: '4px !important'
            })
          }}
          styles={{ label: { whiteSpace: 'pre-line' } }}
        >
          {t('all')}
        </Button>

        {globalData.systemGroups?.map((group) => {
          const isActive = group.id === active;
          return (
            <Button
              key={group.id}
              h={40}
              miw={'max-content'}
              p={'9.5px 16px 9.5px 16px'}
              color={isActive ? 'dark-blue' : 'gray.3'}
              c={isActive ? 'white' : 'rgba(162, 163, 168, 1)'}
              onClick={() => setActive(group.id)}
              sx={{
                borderTopLeftRadius: '4px !important',
                borderBottomLeftRadius: '4px !important',
                ...(isActive && {
                  borderTopRightRadius: '4px !important',
                  borderBottomRightRadius: '4px !important'
                })
              }}
              styles={{ label: { whiteSpace: 'pre-line' } }}
            >
              {group.username}
            </Button>
          );
        })}

        {globalData.systemGroups?.map((group) => {
          const isActive = group.id === active;
          return (
            <Button
              key={group.id}
              h={40}
              miw={'max-content'}
              p={'9.5px 16px 9.5px 16px'}
              color={isActive ? 'dark-blue' : 'gray.3'}
              c={isActive ? 'white' : 'rgba(162, 163, 168, 1)'}
              onClick={() => setActive(group.id)}
              sx={{
                borderTopLeftRadius: '4px !important',
                borderBottomLeftRadius: '4px !important',
                ...(isActive && {
                  borderTopRightRadius: '4px !important',
                  borderBottomRightRadius: '4px !important'
                })
              }}
              styles={{ label: { whiteSpace: 'pre-line' } }}
            >
              {group.username}
            </Button>
          );
        })}
        {globalData.systemGroups?.map((group) => {
          const isActive = group.id === active;
          return (
            <Button
              key={group.id}
              h={40}
              miw={'max-content'}
              p={'9.5px 16px 9.5px 16px'}
              color={isActive ? 'dark-blue' : 'gray.3'}
              c={isActive ? 'white' : 'rgba(162, 163, 168, 1)'}
              onClick={() => setActive(group.id)}
              sx={{
                borderTopLeftRadius: '4px !important',
                borderBottomLeftRadius: '4px !important',
                ...(isActive && {
                  borderTopRightRadius: '4px !important',
                  borderBottomRightRadius: '4px !important'
                })
              }}
              styles={{ label: { whiteSpace: 'pre-line' } }}
            >
              {group.username}
            </Button>
          );
        })}
      </Group>
      {/* <ScrollButtons /> */}

      {appWidth !== width && (
        <Group
          pos="absolute"
          right={0}
          top={-2}
          bg="#f8f9fa"
          p={'5px 10px'}
          spacing="xs"
        >
          <ActionIcon
            radius="xl"
            size="lg"
            color="gray.3"
            variant="filled"
            onClick={() => handleClick('prev')}
          >
            <IconChevronLeft color="rgba(162, 163, 168, 1)" />
          </ActionIcon>
          <ActionIcon
            radius="xl"
            size="lg"
            color="gray.3"
            variant="filled"
            onClick={() => handleClick('next')}
          >
            <IconChevronRight color="rgba(162, 163, 168, 1)" />
          </ActionIcon>
        </Group>
      )}
    </Box>
  );
};

// const ScrollButtons = () => {
//   const { appWidth, scrollWidth, scrollRef } = useContext(ScrollContext);
//   if (appWidth === scrollWidth) return null;

//   console.log(scrollRef);

//   const handleClick = (type: 'prev' | 'next') => {
//     if ('prev') {
//       scrollRef.current.scrollLeft += 20;
//       return;
//     }
//     scrollRef.current.scrollRight += 20;
//   };

//   return (
//     <Group
//       pos="absolute"
//       right={0}
//       top={-2}
//       bg="#f8f9fa"
//       p={'5px 10px'}
//       spacing="xs"
//     >
//       <ActionIcon
//         radius="xl"
//         size="lg"
//         color="gray.3"
//         variant="filled"
//         onClick={() => handleClick('prev')}
//       >
//         <IconChevronLeft color="rgba(162, 163, 168, 1)" />
//       </ActionIcon>
//       <ActionIcon
//         radius="xl"
//         size="lg"
//         color="gray.3"
//         variant="filled"
//         onClick={() => handleClick('next')}
//       >
//         <IconChevronRight color="rgba(162, 163, 168, 1)" />
//       </ActionIcon>
//     </Group>
//   );
// };
