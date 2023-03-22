import i18n from '@/locales/i18n';
import * as yup from 'yup';

const { t } = i18n;

export const idSchema = (required = false) => {
  if (required) {
    return yup
      .number()
      .nullable()
      .positive(t('message.error.required'))
      .required(t('message.error.required'));
  }
  return yup.number().nullable();
  // if (required) {
  //   return yup
  //     .string()
  //     .nullable()
  //     .required(t('message.error.required'))
  //     .test('positiveInt', t('message.error.required'), (value) => {
  //       if (!value) return false;
  //       return parseInt(value) > 0;
  //     });
  // }
  // return yup.string().nullable();
};

export const usernameSchema = () => {
  return yup
    .string()
    .nullable()
    .trim()
    .required(t('message.error.requiredUsername'));
};

export const passwordSchema = () => {
  return yup
    .string()
    .nullable()
    .trim()
    .required(t('message.error.requiredPassword'));
};

export const stringSchema = (required = false) => {
  if (required) {
    return yup.string().nullable().trim().required(t('message.error.required'));
  }
  return yup.string().nullable().trim();
};

export const numberSchema = (required = false) => {
  if (required) {
    return yup
      .number()
      .nullable()
      .typeError(t('message.error.number'))
      .required(t('message.error.required'));
  }
  return yup.number().nullable().typeError(t('message.error.number'));
};

export const dateSchema = (required = false) => {
  if (required) {
    return yup
      .date()
      .nullable()
      .typeError(t('message.error.date'))
      .required(t('message.error.required'));
  }
  return yup.date().nullable().typeError(t('message.error.date'));
};

export const emailSchema = (required = false) => {
  if (required) {
    return yup
      .string()
      .nullable()
      .trim()
      .email(t('message.error.email'))
      .required(t('message.error.required'));
  }
  return yup.string().trim().email(t('message.error.email'));
};

export const urlSchema = (required = false) => {
  if (required) {
    return yup
      .string()
      .nullable()
      .trim()
      .url(t('message.error.url'))
      .required(t('message.error.required'));
  }
  return yup.string().nullable().trim().url(t('message.error.url'));
};
