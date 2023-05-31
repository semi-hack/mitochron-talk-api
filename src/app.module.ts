import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './components/chat/chat.module';
import { TalkModule } from './components/talk/talk.module';
import { AttendeeModule } from './components/attendee/attendee.module';
import { ChatGateway } from './components/chat/chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    TalkModule,
    AttendeeModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
