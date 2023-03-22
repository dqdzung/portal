import pdtLogo from '@/assets/images/pdt-logo.png';
import { Anchor, Stack, Text } from '@mantine/core';

function Copyright() {
  return (
    <Stack align="center" spacing="xs">
      <Text
        sx={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 400,
          color: 'rgba(0, 0, 0, 0.6)',
          textAlign: 'center',
          lineHeight: 1.43
        }}
      >
        <span>Copyright ©{new Date().getFullYear()}</span>
        <Anchor href="https://piditi.com/" target="_blank" ml="sm">
          <img src={pdtLogo} alt="pdt-logo" height={20} width="auto" />
        </Anchor>
      </Text>
      <Text
        component="span"
        sx={{
          margin: 0,
          fontWeight: 400,
          fontSize: '11px',
          lineHeight: 1.66,
          textAlign: 'center',
          color: 'rgba(0, 0, 0, 0.6)'
        }}
      >
        All rights reserved Phenikaa Digital Transformation JSC
      </Text>
    </Stack>
  );
}

export default Copyright;
