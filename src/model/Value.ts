import crypto from 'crypto';

export type ValueId = string;
export type WildcardId = string;
export interface Value {
  id: ValueId;
  encrypted: string;
  initializationVector: string;
}

export interface ValueRepository {
  save(value: Value): Promise<Value>;
  find(id: ValueId | WildcardId): Promise<Value[]>;
}

export type Store = (id: string, data: object, encryptionKey: string) => Value;
export type RawData = (value: Value, encryptionKey: string) => object;

const IV_LENGTH = 16;

export const store: Store = (id, data, encryptionKey) => {
  const iv = crypto.randomBytes(IV_LENGTH);

  return {
    id,
    encrypted: encrypt(data, encryptionKeyHash(encryptionKey), iv),
    initializationVector: iv.toString('hex')
  };
};

export const rawData: RawData = (value, decryptionKey) =>
  decrypt(value.encrypted, encryptionKeyHash(decryptionKey), Buffer.from(value.initializationVector, 'hex'));

const encryptionKeyHash = (encryptionKey: string): Buffer =>
  Buffer.from(
    crypto
      .createHash('sha1')
      .update(encryptionKey, 'utf8')
      .digest('hex')
      .slice(0, 32)
  );

const encrypt = (data: object, encryptionKey: Buffer, iv: Buffer): string => {
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
  const encrypted = cipher.update(JSON.stringify(data));

  return Buffer.concat([encrypted, cipher.final()]).toString('hex');
};

const decrypt = (encrypted: string, decryptionKey: Buffer, iv: Buffer): object => {
  const encryptedText = Buffer.from(encrypted, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', decryptionKey, iv);
  const decrypted = decipher.update(encryptedText);

  return JSON.parse(Buffer.concat([decrypted, decipher.final()]).toString());
};
