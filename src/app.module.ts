import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalConfig, LoggerMiddleWare, RequestMiddleware } from './lib';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { AdminModule } from './modules/admin';
import { AgentModule } from './modules/agent';
import { RequestContextModule } from './services';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { Keyv } from 'keyv';
import { createKeyv } from '@keyv/redis';
import { CacheableMemory } from 'cacheable';
@Module({
  imports: [
    AdminModule,
    AgentModule,
    RequestContextModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [GlobalConfig],
    }),
    CacheModule.registerAsync({
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (config: ConfigService) => {
        return {
          stores: [
            new Keyv({
              store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
            }),
            createKeyv(config.get('redis.url')),
          ],
        };
      },
    }),

    TypeOrmModule.forRoot({
      ...GlobalConfig().datasource,
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: [join(__dirname, '**', '*.migration.{ts,js}')],
      synchronize: process.env.ENVIRONMENT === 'development' ? true : false,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppModule],
})
export class AppModule implements NestModule {
  constructor(dataSource: DataSource) {
    console.log(
      `Database started with username: ${dataSource.driver.database}`,
    );
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare);
    consumer.apply(RequestMiddleware);
  }
}
