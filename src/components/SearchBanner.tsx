import {
  TextProps,
  BackgroundImage,
  Box,
  Group,
  TextInput,
  Button,
  Text
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import banner from '@/assets/images/banner.png';

const SearchBanner = () => {
  const { t } = useTranslation();
  const isLgScreen = useMediaQuery('(min-width: 990px');
  const is600Screen = useMediaQuery('(max-width: 600px');

  const textStyle: TextProps = {
    ff: 'SFProRoundedMedium',
    size: isLgScreen ? 40 : 25,
    transform: 'capitalize'
  };

  return (
    <BackgroundImage src={banner} h="403px">
      <Box mx={isLgScreen ? 200 : 'sm'} pt={95}>
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
          w={is600Screen ? '100%' : '50%'}
          py={10}
          pl={26}
          pr={10}
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
  );
};
export default SearchBanner;
