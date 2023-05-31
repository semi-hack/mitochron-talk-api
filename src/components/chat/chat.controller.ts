import { Controller, Get, Request, Res, Response } from "@nestjs/common";

@Controller('chat')
export class ChatController {
  constructor() {}

  @Get()
  async chat(@Request() req, @Response() res) {
    console.log(__dirname + './chat.html');
    return res.sendfile('src/components/chat/chat.html');
  }
}