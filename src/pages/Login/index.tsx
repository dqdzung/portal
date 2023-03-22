import bannerImg from '@/assets/images/login-bg.png';
import logo from '@/assets/images/pnk-logo-dark.png';
import Copyright from '@/components/Copyright';
import LanguagePicker from '@/components/LanguagePicker';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/models/user';
import { ROUTER } from '@/router';

import { passwordSchema, usernameSchema } from '@/utils/form';
import {
  Box,
  Button,
  MediaQuery,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconLock, IconUser } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useStyles } from './styles';

const loginSchema = yup.object({
  username: usernameSchema(),
  password: passwordSchema()
});

export type LoginUser = Pick<User, 'username' | 'password'>;

function Login() {
  const { t } = useTranslation();
  const { classes } = useStyles();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginUser>({
    initialValues: {
      username: '',
      password: ''
    },
    validate: yupResolver(loginSchema)
  });

  const handleSubmit = (values: LoginUser) => {
    setLoading(true);
    login(values, {
      onSuccess: () => {
        navigate(ROUTER.PORTAL, {
          replace: true
        });
      },
      onError: (error) => {
        if (error.message.includes('401')) {
          showNotification({
            color: 'red',
            message: t('message.error.credential')
          });
          return;
        }
        showNotification({
          color: 'red',
          message: t('message.error.index')
        });
      },
      onFinally: () => {
        setLoading(false);
      }
    });
  };

  return (
    <div className={classes.wrapper}>
      <Box className={classes.overlay}>
        <Box className={classes.banner}>
          <Text fz={64} ff="RobotoBold">
            PUSP
          </Text>
        </Box>
        <Box className={classes.bannerImg}>
          <img src={bannerImg} alt="banner-img" width="70%" />
        </Box>
      </Box>
      <Paper className={classes.formWrapper}>
        <div className={classes.formInner}>
          <img src={logo} alt="logo" height={52} />
          <Title className={classes.title} w="80%">
            {t('appname')}
          </Title>
          <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label={t('user.username')}
              withAsterisk
              size="md"
              autoFocus
              icon={<IconUser size={20} />}
              {...form.getInputProps('username')}
            />
            <PasswordInput
              label={t('user.password')}
              withAsterisk
              size="md"
              icon={<IconLock size={20} />}
              {...form.getInputProps('password')}
            />
            <Button
              type="submit"
              color="secondary"
              size="md"
              fullWidth
              loading={loading}
            >
              {t('button.login')}
            </Button>
          </form>
          <Box mt="xl">
            <Copyright />
          </Box>
        </div>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Box>
            <LanguagePicker />
          </Box>
        </MediaQuery>
      </Paper>
    </div>
  );
}

export default Login;
