import md5 from 'md5';
import { RESPONSE_FORMAT } from './constants';

const addPaddingCharacter = (number, paddingCount, paddingChar = '0') =>
  (paddingChar.repeat(paddingCount) + number).slice(-paddingCount);

export const getTimestamp = (date = new Date()) => {
  // Smite API expects yyyyMMddHHmmSS
  const year = addPaddingCharacter(date.getUTCFullYear(), 4);
  const month = addPaddingCharacter(date.getUTCMonth() + 1, 2);
  const day = addPaddingCharacter(date.getUTCDate(), 2);
  const hours = addPaddingCharacter(date.getUTCHours(), 2);
  const minutes = addPaddingCharacter(date.getUTCMinutes(), 2);
  const seconds = addPaddingCharacter(date.getUTCSeconds(), 2);
  return year + month + day + hours + minutes + seconds;
};

export const getSignature = (methodName) => {
  return md5(process.env.DEV_ID + methodName + process.env.AUTH_KEY + getTimestamp());
};

export const getUrlMandatoryPath = (session, methodName) =>
  `${RESPONSE_FORMAT}/${process.env.DEV_ID}/${getSignature(methodName)}/${session}/${getTimestamp()}/1`; // 1 for English, 3 for French
