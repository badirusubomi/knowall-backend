import { ConfigService } from '@nestjs/config';

export abstract class CacheServise {
  constructor(config: ConfigService) {}

  abstract cache(): any;
  abstract retrieve(): any;
}
