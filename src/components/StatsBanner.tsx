import {
  BackgroundImage,
  Box,
  Flex,
  Group,
  MediaQuery,
  Stack,
  Text
} from '@mantine/core';
import statBanner from '@/assets/images/statBanner.png';
import { useTranslation } from 'react-i18next';
import { GlobalDataContext } from '@/contexts/GlobalDataContext';
import { useContext } from 'react';

const StatsBanner = () => {
  const { t } = useTranslation();
  const globalData = useContext(GlobalDataContext);
  return (
    <MediaQuery smallerThan="lg" styles={{ backgroundSize: '700%' }}>
      <BackgroundImage
        src={statBanner}
        h="201px"
        mt={64}
        sx={{ backgroundSize: '200%', backgroundPosition: 'center' }}
      >
        <Stack align="center">
          <Text
            c="#FB8F4D"
            ff="SFProRoundedSemiBold"
            fz={24}
            mt={28}
            transform="capitalize"
          >
            {t('stat.index')}
          </Text>

          <Flex align="center" w="100%" justify="space-around">
            <Box sx={{ textAlign: 'center' }}>
              <Text c="white" fz={48} ff="PoppinsRegular">
                8
              </Text>
              <Text c="white" fz={14} ff="PoppinsRegular">
                {t('stat.department')}
              </Text>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Text c="white" fz={48} ff="PoppinsRegular">
                {globalData.systems?.length || 0}
              </Text>
              <Text c="white" fz={14} ff="PoppinsRegular">
                {t('stat.system')}
              </Text>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Text c="white" fz={48} ff="PoppinsRegular">
                15.000
              </Text>
              <Text c="white" fz={14} ff="PoppinsRegular">
                {t('stat.user')}
              </Text>
            </Box>
          </Flex>
        </Stack>
      </BackgroundImage>
    </MediaQuery>
  );
};

export default StatsBanner;
