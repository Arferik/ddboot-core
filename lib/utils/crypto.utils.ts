import * as Crypto from 'crypto';

const algorithm = 'aes-256-cbc';

export function encrypt(salt: string, text: string) {
  const iv = Crypto.randomBytes(16);
  // Creating Cipheriv with its parameter
  const cipher = Crypto.createCipheriv(algorithm, Buffer.from(salt), iv);

  // Updating text
  let encrypted = cipher.update(text);

  // Using concatenation
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  // Returning iv and encrypted data
  const ivStr: string = iv.toString('hex');
  const encryptedData: string = encrypted.toString('hex');
  return btoa(`${encryptedData}:${ivStr}`);
}

export function decrypt(salt: string, encryptedDataParam: string) {
  if (!encryptedDataParam) {
    return '';
  }
  const [encryptedData, textIv] = atob(encryptedDataParam).split(':');
  if (!encryptedData || !textIv) {
    return '';
  }
  const bufferIV = Buffer.from(textIv, 'hex');
  const encryptedText = Buffer.from(encryptedData, 'hex');
  // Creating Decipher
  const decipher = Crypto.createDecipheriv(
    algorithm,
    Buffer.from(salt),
    bufferIV,
  );

  // Updating encrypted text
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

export function btoa(botaStr: string): string {
  return Buffer.from(botaStr).toString('base64');
}

export function atob(b64Encoded: string): string {
  return Buffer.from(b64Encoded, 'base64').toString();
}

/**
 *
 * @param defaultStr
 * @param salt
 * @returns
 */
export function md5(defaultStr = '', salt = ''): string {
  const saltStr = `${defaultStr}:${salt}`;
  const md5 = Crypto.createHash('md5');
  return md5.update(saltStr).digest('hex');
}

export const getPbkdf2 = (
  value: string,
  salt: string,
  iterations = 5000,
): Promise<string> =>
  new Promise((resolve, reject) => {
    Crypto.pbkdf2(value, salt, iterations, 64, 'sha512', (err, derivedKey) => {
      if (err) {
        console.error('getPbkdf2 error', err);
        reject(err);
      } else {
        resolve(derivedKey.toString('hex'));
      }
    });
  });

export const comparePbkdf2 = async (
  value: string,
  salt: string,
  oldPBKHashCode: string,
  iterations = 5000,
) => {
  let newHashCode = '';
  try {
    newHashCode = await getPbkdf2(value, salt, iterations);
  } catch (error) {
    console.error('comparePbkdf2 error', error);
  }
  return newHashCode === oldPBKHashCode;
};

export const randomUUID = () => Crypto.randomUUID();
