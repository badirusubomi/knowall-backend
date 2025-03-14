import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalConfig, LoggerMiddleWare, RequestMiddleware } from './lib';
import { ChatModule } from './modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { AdminModule } from './modules/admin';
import { AgentModule } from './modules/agent';
import { RequestContextModule } from './services';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ChatModule,
    AdminModule,
    AgentModule,
    RequestContextModule,
    ConfigModule.forRoot({
      isGlobal: true,
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
