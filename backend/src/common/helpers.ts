// libraries
import * as bcrypt from 'bcryptjs';

// constants
import { PASSWORD_GENERATED_SALT_LENGTH } from './constants';

// content

export function createHashFromPassword(password: string): Promise<string> {
  return bcrypt.hash(password, PASSWORD_GENERATED_SALT_LENGTH);
}

export function comparePasswordWithHash(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
