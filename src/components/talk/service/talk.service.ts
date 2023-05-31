import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AttendeeService } from '../../attendee/service/attendee.service';
import { CreateTalkInput } from '../interface/talk.interface';
import { TalkRepository } from '../repository/talk.repository';
import { Talk, TalkDocument } from '../schema/talk.schema';

@Injectable()
export class TalkService {
  constructor(
    private readonly talkRepo: TalkRepository,
    readonly attendeeService: AttendeeService,
  ) {}

  async createTalk(input: CreateTalkInput): Promise<TalkDocument> {
    const existingTalk = await this.talkRepo.find({ title: input.title });
    if (existingTalk.length > 0) {
      throw new BadRequestException('This talk already exists');
    }
    return this.talkRepo.create(input);
  }

  async findTalkById(id: string): Promise<TalkDocument> {
    return this.talkRepo.findById(id);
  }

  async findAllTalk(): Promise<TalkDocument[]> {
    return this.talkRepo.findAllTalks();
  }

  async addAttendees(id: string, attendeeId: string): Promise<TalkDocument> {
    const talk = await this.talkRepo.findById(id);
    if (!talk) {
      throw new BadRequestException('Talk doesnt exist');
    }

    const attendee = await this.attendeeService.findById(attendeeId);
    if (!attendee) {
      throw new BadRequestException('This Attendee does not exist');
    }

    talk.attendees.push(attendee.id);

    return this.talkRepo.updateTalk(talk.id, { attendees: talk.attendees });
  }

  async deleteTalk(id: string): Promise<void> {
    const talk = await this.talkRepo.findOne({
      where: { id },
    });

    if (!talk) {
      throw new NotFoundException('Talk not found');
    }

    await this.talkRepo.deleteTalk(id);
  }
}
