import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  constructor(readonly client: any) {}
}
