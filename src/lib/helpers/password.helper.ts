import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../const';

export class CommonHelpers {
  async generatePasswordHash(plainPassword: string) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(plainPassword, salt);
  }

  async comparePasswords(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
