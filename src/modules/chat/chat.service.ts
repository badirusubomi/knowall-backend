import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chats } from 'src/lib';
import { Equal, Repository } from 'typeorm';
import { CreateChatDto, UpdateChatRequestDto } from './dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chats) readonly chatsRepository: Repository<Chats>,
  ) {}

  async initChat(createChatDto: CreateChatDto) {
    await this.chatsRepository.save;
    return 'This action adds a new chat';
  }

  async findAll(pagination: any, filter: any) {
    const chats = await this.chatsRepository.find({ where: { ...filter } });
    return {
      status: 'success',
      message: 'chats succesfully retrieved',
      data: chats,
    };
  }

  async getSessionChats(id: string) {
    const chats = await this.chatsRepository.find({ where: { id: Equal(id) } });
    return {
      status: 'success',
      message: 'chat session succesfully retrieved',
      data: chats,
    };
  }

  async chatReceived(payload: any) {
    return 'Message received. Working on response';
  }

  update(id: number, updateChatDto: UpdateChatRequestDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
