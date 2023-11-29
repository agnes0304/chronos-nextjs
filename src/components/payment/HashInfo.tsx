import crypto from 'crypto';

export const HashInfo = (info:string) => {
  const sha512Hash = crypto.createHash('sha512');
  sha512Hash.update(info);
  return sha512Hash.digest('hex');
};