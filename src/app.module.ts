import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleWare } from './lib';
import { ChatModule, AuthModule } from './modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    AuthModule,
    ChatModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      url: process.env.DB_URL,
      // port: parseInt(process.env.POSTGRES_PORT) || 5432,
      // username: process.env.POSTGRES_USERNAME,
      // password: String(process.env.POSTGRES_PASSWORD),
      // database: process.env.POSTGRES_DB,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: [join(__dirname, '**', '*.migration.{ts,js}')],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppModule],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log(
      `Database started with username: ${dataSource.driver.database}`,
    );
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare);
  }
}
