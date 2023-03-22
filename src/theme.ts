/* eslint-disable @typescript-eslint/no-shadow */
import i18n from '@/locales/i18n';
import { MantineThemeOverride } from '@mantine/core';

const { t, language } = i18n;

export const theme: MantineThemeOverride = {
  colors: {
    success: [
      '#b8e5ba',
      '#a6dea9',
      '#95d898',
      '#83d187',
      '#71cb76',
      '#60c465',
      '#4ebe54',
      '#42b247',
      '#3ba040',
      '#358f39'
    ],
    error: [
      '#D32F2F',
      '#d43434',
      '#d53939',
      '#d63f3f',
      '#d74444',
      '#d94949',
      '#da4e4e',
      '#db5353',
      '#dc5959'
    ],
    info: [
      '#aae1fe',
      '#95d9fe',
      '#80d1fe',
      '#6bcafe',
      '#56c2fd',
      '#41bbfd',
      '#2bb3fd',
      '#16abfd',
      '#02a4fb',
      '#0296e6'
    ],
    'dark-blue': [
      '#DBE4FF',
      '#5875CD',
      '#3C5EC4',
      '#3351A9',
      '#2A438D',
      '#1F3166',
      '#223671',
      '#1B2B5A',
      '#18264F',
      '#142044'
    ],
    secondary: [
      '#FFEAE0',
      '#F7A37D',
      '#F69367',
      '#F58451',
      '#F3743C',
      '#EE530E',
      '#F26526',
      '#D34A0D',
      '#B9410B',
      '#9F3809'
    ],
    white: [
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF',
      '#FFFFFF'
    ]
  },
  primaryColor: 'dark-blue',
  primaryShade: 6, // default color level [0-9]
  fontFamily: 'Roboto,Arial,sans-serif',
  headings: {
    fontFamily: 'RobotoMedium,Arial,sans-serif'
  },
  focusRingStyles: {
    styles: (theme) => ({
      outline: `2px solid ${theme.colors['dark-blue'][5]}`
    })
  },
  cursorType: 'pointer',
  components: {
    Anchor: {
      defaultProps: (theme) => ({
        c: theme.colors.blue[7]
      })
    },
    Badge: {
      styles: {
        root: {
          textTransform: 'initial'
        }
      }
    },
    Button: {
      defaultProps: {
        color: 'secondary'
      },
      styles: {
        icon: {
          marginRight: '8px !important'
        },
        root: {
          fontFamily: 'RobotoMedium,Arial,sans-serif'
        }
      }
    },
    Checkbox: {
      styles: {
        root: {
          display: 'flex',
          height: '100%'
        },
        body: {
          alignItems: 'flex-start'
        },
        input: {
          cursor: 'pointer'
        },
        label: {
          cursor: 'pointer',
          userSelect: 'none'
        }
      }
    },
    InputWrapper: {
      styles: {
        label: {
          fontFamily: 'RobotoBold',
          marginBottom: '2px',
          display: 'block',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        },
        error: {
          marginTop: '5px'
        }
      }
    },
    Modal: {
      defaultProps: (theme) => ({
        centered: true,
        overlayColor: theme.colors.dark[9],
        overlayOpacity: 0.55,
        overlayBlur: 0
      }),
      styles: () => ({
        title: {
          fontFamily: 'RobotoMedium,Arial,sans-serif',
          fontSize: 18
        }
      })
    },

    Switch: {
      styles: () => ({
        track: {
          cursor: 'pointer'
        }
      })
    },
    TextArea: {
      defaultProps: {
        minRows: 2
      }
    },
    Tooltip: {
      defaultProps: {
        color: 'gray.6',
        offset: 10,
        openDelay: 300,
        withinPortal: true
      },
      styles: {
        tooltip: {
          padding: '4px 8px',
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(39,39,41,0.5)'
        }
      }
    }
  },

  datesLocale: language
};
