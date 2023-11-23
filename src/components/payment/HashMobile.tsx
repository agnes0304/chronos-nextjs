import crypto from 'crypto';

export const HashMobile = (mobile:string) => {
  const sha512Hash = crypto.createHash('sha512');
  sha512Hash.update(mobile);
  return sha512Hash.digest('hex');
};