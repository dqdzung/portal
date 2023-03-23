import { GlobalDataContext } from '@/contexts/GlobalDataContext';
import { Button } from '@mantine/core';
import { t } from 'i18next';
import { useContext, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';

const SystemGroupCarousel = ({
  activeId,
  setActive
}: {
  activeId: number;
  setActive: (id: number) => void;
}) => {
  const globalData = useContext(GlobalDataContext);
  const is1200px = useMediaQuery('(min-width: 1200px');

  return (
    <Carousel
      slideSize="10%"
      slideGap="sm"
      loop
      align="start"
      slidesToScroll={is1200px ? 3 : 1}
      px={45}
      mx={is1200px ? 90 : 'sm'}
      styles={{
        control: {
          '&[data-inactive]': {
            opacity: 0,
            cursor: 'default'
          }
        }
      }}
      breakpoints={[
        { maxWidth: 'md', slideSize: '33%' },
        { maxWidth: 'sm', slideSize: '50%' },
        { maxWidth: 'xs', slideSize: '100%', slideGap: 0 }
      ]}
    >
      <Carousel.Slide>
        <Button
          h={40}
          miw="max-content"
          fullWidth
          p={'9.5px 16px 9.5px 16px'}
          color={activeId === 0 ? 'dark-blue' : 'gray.3'}
          c={activeId === 0 ? 'white' : 'rgba(162, 163, 168, 1)'}
          onClick={() => setActive(0)}
          sx={{
            borderTopLeftRadius: '4px !important',
            borderBottomLeftRadius: '4px !important',
            ...(activeId !== 0 && {
              borderTopRightRadius: '4px !important',
              borderBottomRightRadius: '4px !important'
            })
          }}
          styles={{ label: { whiteSpace: 'pre-line' } }}
        >
          {t('all')}
        </Button>
      </Carousel.Slide>
      {globalData.systemGroups?.map((group) => {
        const isActive = group.id === activeId;
        return (
          <Carousel.Slide key={group.id}>
            <Button
              key={group.id}
              h={40}
              miw={'max-content'}
              fullWidth
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
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
};

export default SystemGroupCarousel;
