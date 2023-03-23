import { GlobalDataContext } from '@/contexts/GlobalDataContext';
import { SYSTEM_CARD_IMAGES, SYSTEM_GROUP_COLOR } from '@/pages/Portal/links';
import {
  BackgroundImage,
  Badge,
  Box,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Stack,
  Text
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useContext, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import StatsBanner from './StatsBanner';
import SystemGroupCarousel from './SystemGroupCarousel';
import footerBg from '@/assets/images/footerBg.png';

const AppMain = () => {
  const isLgScreen = useMediaQuery('(min-width: 990px');
  const globalData = useContext(GlobalDataContext);
  const [activeGroupId, setActiveGroupId] = useState(0);

  const { t } = useTranslation();

  const systems = useMemo(() => {
    let res = [];
    if (activeGroupId === 0) {
      res =
        globalData.systems?.map(
          ({ id, groupId, link, description, username }) => ({
            id,
            link,
            description,
            username,
            groupId,
            imageUrl: SYSTEM_CARD_IMAGES.find((e) => e.id === id)?.imageUrl
          })
        ) || [];
    } else {
      res =
        globalData.systems
          ?.filter((e) => e.groupId === activeGroupId)
          .map(({ id, groupId, link, description, username }) => ({
            id,
            link,
            description,
            username,
            groupId,
            imageUrl: SYSTEM_CARD_IMAGES.find((e) => e.id === id)?.imageUrl
          })) || [];
    }
    return res.sort((a, b) => a.id - b.id);
  }, [activeGroupId, globalData]);

  return (
    <Stack mt={64} spacing={0}>
      <Box mx={isLgScreen ? 200 : 'sm'}>
        <SystemGroupCarousel
          activeId={activeGroupId}
          setActive={setActiveGroupId}
        />

        <Grid gutter="32px" mt={16} align="center">
          {systems?.map((system) => (
            <Grid.Col xs={12} sm={6} md={6} lg={4} xl={3} key={system.id}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Image
                    src={system.imageUrl}
                    height={150}
                    alt={system.description}
                  />
                  <Badge
                    variant="filled"
                    pos="absolute"
                    top={16}
                    left={16}
                    radius="sm"
                    px={8}
                    py={4}
                    sx={{
                      zIndex: 99,
                      backgroundColor: SYSTEM_GROUP_COLOR.find(
                        (e) => e.id === system.groupId
                      )?.color
                    }}
                  >
                    <Text fz={12} ff="PoppinsRegular">
                      {
                        globalData.systemGroups?.find(
                          (e) => e.id === system.groupId
                        )?.username
                      }
                    </Text>
                  </Badge>
                </Card.Section>

                <Group position="left" mt="md" mb="xs">
                  <Text weight="bold" ff="PoppinsRegular" fz={16}>
                    {system.username}
                  </Text>
                </Group>

                <Group sx={{ justifyContent: 'flex-end' }}>
                  <Button
                    variant="outline"
                    color="primary"
                    mt={16}
                    radius={8}
                    component="a"
                    href={system.link}
                    target="_blank"
                  >
                    {t('button.access')}
                  </Button>
                </Group>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Box>

      <StatsBanner />

      <BackgroundImage
        src={footerBg}
        py={32}
        sx={{
          backgroundSize: '100% auto',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom'
        }}
      >
        <Box mx={isLgScreen ? 200 : 'sm'} h={'100%'}>
          <Grid gutter="32px" mt={16} align="center">
            {systems?.map((system) => (
              <Grid.Col xs={12} sm={6} md={6} lg={4} xl={3} key={system.id}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section>
                    <Image
                      src={system.imageUrl}
                      height={150}
                      alt={system.description}
                    />
                    <Badge
                      variant="filled"
                      pos="absolute"
                      top={16}
                      left={16}
                      radius="sm"
                      px={8}
                      py={4}
                      sx={{
                        zIndex: 99,
                        backgroundColor: SYSTEM_GROUP_COLOR.find(
                          (e) => e.id === system.groupId
                        )?.color
                      }}
                    >
                      <Text fz={12} ff="PoppinsRegular">
                        {
                          globalData.systemGroups?.find(
                            (e) => e.id === system.groupId
                          )?.username
                        }
                      </Text>
                    </Badge>
                  </Card.Section>

                  <Group position="left" mt="md" mb="xs">
                    <Text weight="bold" ff="PoppinsRegular" fz={16}>
                      {system.username}
                    </Text>
                  </Group>

                  <Group sx={{ justifyContent: 'flex-end' }}>
                    <Button
                      variant="outline"
                      color="primary"
                      mt={16}
                      radius={8}
                      component="a"
                      href={system.link}
                      target="_blank"
                    >
                      {t('button.access')}
                    </Button>
                  </Group>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      </BackgroundImage>
    </Stack>
  );
};
export default AppMain;
