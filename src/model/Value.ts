import crypto from 'crypto';

export type ValueId = string;
export interface Value {
  id: ValueId;
  encrypted: string;
  initializationVector: string;
}

export interface ValueRepository {
  save(value: Value): Promise<Value>;
}

export type Store = (id: string, rawValue: object, encryptionKey: string) => Value;

const IV_LENGTH = 16;

export const store: Store = (id, rawValue, encryptionKey) => {
  const iv = crypto.randomBytes(IV_LENGTH);

  return {
    id,
    encrypted: encrypt(rawValue, encryptionKeyHash(encryptionKey), iv),
    initializationVector: iv.toString('hex')
  };
};

const encryptionKeyHash = (encryptionKey: string): Buffer =>
  Buffer.from(
    crypto
      .createHash('sha1')
      .update(encryptionKey, 'utf8')
      .digest('hex')
      .slice(0, 32)
  );

const encrypt = (rawValue: object, encryptionKey: Buffer, iv: Buffer) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
  const encrypted = cipher.update(JSON.stringify(rawValue));

  return Buffer.concat([encrypted, cipher.final()]).toString('hex');
};
