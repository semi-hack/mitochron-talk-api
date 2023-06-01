import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { SuccessResponse } from '../../../shared/utils/response.util';
import { AddAttendeeDto, TalkDto } from '../dto/talk.dto';
import { TalkService } from '../service/talk.service';

@Controller('talks')
export class TalkController {
  constructor(private readonly talkService: TalkService) {}

  @Post()
  async create(@Body() body: TalkDto) {
    const talk = await this.talkService.createTalk(body);
    return SuccessResponse('Talk Created Successfully', talk)
  }

  @Get()
  async getTalks() {
    const talks = await this.talkService.findAllTalk();
    return SuccessResponse('Talks returned Successfully', talks);
  }

  @Get('/:id')
  async getTalkById(@Param('id') id: string) {
    const talk = await this.talkService.findTalkById(id);
    return SuccessResponse('Talk returned Successfully', talk)
  }

  @Patch('/:id')
  async addAttendee(@Param('id') id: string, @Body() body: AddAttendeeDto) {
    const talk = await this.talkService.addAttendees(id, body.attendeeId);
    return SuccessResponse('Attendee Added Successfully', talk)
  }

  @Delete('/:id')
  async deleteTalk(@Param('id') id: string) {
    await this.talkService.deleteTalk(id);
    return SuccessResponse('Talk was deleted successfully');
  }
}
