/* eslint-disable @typescript-eslint/no-shadow */
import { langs } from '@/locales/i18n';
import {
  Box,
  BoxProps,
  createStyles,
  Menu,
  Text,
  UnstyledButton
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
  control: {
    minWidth: 120,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark'
        ? theme.colors.dark?.[6]
        : theme.colors.gray[2]
    }`,
    transition: 'background-color 150ms ease',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[opened ? 5 : 6]
        : opened
        ? theme.colors.gray[0]
        : theme.white,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0]
    }
  },

  label: {
    fontSize: theme.fontSizes.xs,
    userSelect: 'none'
  },

  icon: {
    transition: 'transform 150ms ease',
    transform: opened ? 'rotate(180deg)' : 'rotate(0deg)'
  }
}));

interface LanguagePickerProps {
  sx?: BoxProps['sx'];
}

function LanguagePicker({ sx }: LanguagePickerProps) {
  const { t } = useTranslation();

  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });
  const [lang, setLang] = useLocalStorage({
    key: 'lang',
    defaultValue: langs[0]
  });

  const data = useMemo(
    () =>
      langs.map((lang) => ({
        label: t(`lang.${lang}`),
        value: lang
      })),
    [t]
  );

  return (
    <Box className="app-language-picker" sx={sx}>
      <Menu
        onOpen={() => setOpened(true)}
        onClose={() => setOpened(false)}
        radius="md"
        width="target"
      >
        <Menu.Target>
          <UnstyledButton className={classes.control}>
            <span className={classes.label}>{t(`lang.${lang}`)}</span>
            <IconChevronDown size={16} className={classes.icon} stroke={1.5} />
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          {data.map(({ label, value }) => (
            <Menu.Item
              onClick={() => {
                if (value !== lang) {
                  setLang(value);
                  window.location.reload();
                }
              }}
              key={value}
            >
              <Text className={classes.label}>{label}</Text>
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}

export default LanguagePicker;
