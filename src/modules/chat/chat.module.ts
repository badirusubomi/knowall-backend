import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chats } from 'src/lib/database';
import { ChatBotEngine } from 'src/common';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatBotEngine],
  imports: [TypeOrmModule.forFeature([Chats])],
})
export class ChatModule {}
