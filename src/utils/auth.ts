import { CONFIG } from '@/config';
import { encode as base64encode } from 'base64-arraybuffer';
import generateRandomString from 'crypto-random-string';
import { JSEncrypt } from 'jsencrypt';

const jsencrypt = new JSEncrypt();
jsencrypt.setPublicKey(CONFIG.PUBLIC_KEY);

export const encrypt = (str: string) => {
  return jsencrypt.encrypt(str);
};

export const generatePKCEPair = async (verifierLength = 43) => {
  const codeVerifier = generateRandomString({
    length: verifierLength,
    type: 'alphanumeric'
  });

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  const base64Digest = base64encode(digest);

  const codeChallenge = base64Digest
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return {
    codeVerifier,
    codeChallenge
  };
};
