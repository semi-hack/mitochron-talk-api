import { forwardRef, Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendeeModule } from '../attendee/attendee.module';
import { TalkController } from './controller/talk.controller';
import { TalkRepository } from './repository/talk.repository';
import { TalkSchema } from './schema/talk.schema';
import { TalkService } from './service/talk.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Talk', schema: TalkSchema}]),
    forwardRef(() => AttendeeModule),
  ],
  providers: [TalkService, TalkRepository],
  controllers: [TalkController],
  exports: [TalkService],
})
export class TalkModule {}