import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // create a new chat session
  @Post()
  initChat(@Body() createChatDto: CreateChatDto) {
    return this.chatService.initChat(createChatDto);
  }

  // get chat session titles and dates
  @Get()
  findAll(@Query('pagination') pagination: any, @Query('filter') filter: any) {
    //temporary pagination, also incorrect
    return this.chatService.findAll(pagination, filter);
  }

  // get all messages in single chat session, paginate response. Default: last 20 chat entries
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.getSessionChats(id);
  }

  // agent sends message to KnowAll
  @Post(':id')
  receiveChat(@Body() payload: any) {
    return this.chatService.chatReceived(payload);
  }
}
