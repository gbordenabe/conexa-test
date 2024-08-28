import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export interface IHashingService {
  hash(plainText: string): Promise<string>;
  compare(plainText: string, hash: string): Promise<boolean>;
}

@Injectable()
export class HashingAdapterService implements IHashingService {
  private readonly saltRounds = 10;

  async hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this.saltRounds);
  }

  async compare(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }
}
