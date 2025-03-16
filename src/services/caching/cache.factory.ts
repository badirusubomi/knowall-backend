import { ConfigService } from '@nestjs/config';
import RedisClient from '@redis/client/dist/lib/client';

export class CacheFactory {
  private cacheChoice: any;

  constructor(private config: ConfigService) {
    this.cacheChoice = config.get('cache.service');
  }

  generateCache() {
    switch (this.cacheChoice) {
      case 'redis':
        return new RedisClient(this.config.get('redis'));
      default:
        return new RedisClient(this.config.get('redis'));
    }
  }
}
