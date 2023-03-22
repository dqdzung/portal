import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  wrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    overflow: 'hidden'
  },
  overlay: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: '24px',
    backgroundColor: theme.colors['dark-blue']?.[6]
  },
  banner: {
    textAlign: 'right',
    color: '#FFF'
  },
  bannerImg: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  formWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
    minWidth: 360,
    borderRadius: '1rem 1rem 0 0',
    position: 'relative',

    '& .app-language-picker': {
      position: 'absolute',
      bottom: theme.spacing.xl,
      right: theme.spacing.xl
    },

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      width: '100%',
      padding: `${theme.spacing.xl}px ${theme.spacing.lg}px ${theme.spacing.lg}px`,
      position: 'absolute',
      bottom: 0
    }
  },
  formInner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'RobotoMedium',
    fontSize: theme.fontSizes.xl,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg
  }
}));
