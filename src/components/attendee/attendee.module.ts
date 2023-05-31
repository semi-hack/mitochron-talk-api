import { forwardRef, Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendeeRepository } from './repository/attendee.repository';
import { AttendeeService } from './service/attendee.service';
import { AttendeeController } from './controller/attendee.controller';
import { AttendeeSchema } from './schema/attendee.schema';


@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Attendee', schema: AttendeeSchema}])
  ],
  providers: [AttendeeService, AttendeeRepository],
  controllers: [AttendeeController],
  exports: [AttendeeService],
})
export class AttendeeModule {}
