import { HEADER_HEIGHT } from '@/components/AppHeader';
import { AuthContext } from '@/contexts/AuthContext';
import { Burger, Transition, Paper, createStyles, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useContext } from 'react';
import UserNav from './UserNav';

const BurgerMenu = () => {
  const { user } = useContext(AuthContext);
  const { classes } = useBurgerStyles();
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
export default BurgerMenu;

const useBurgerStyles = createStyles((theme) => ({
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
