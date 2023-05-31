import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatMessage } from './chat.interface';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('Connection Initalized')
  }

  handleConnection(client: Socket) {
    client.on('chat message', msg => {
      this.server.emit('chat message', msg);
    });
  }

  handleDisconnect(client: Socket){
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('chat')
  handleChat(client: Socket, @MessageBody() message: ChatMessage): void {
    this.server.emit('chat', message);
  }
}