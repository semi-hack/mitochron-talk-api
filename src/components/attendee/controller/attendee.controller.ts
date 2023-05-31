import { Body, Controller, Post } from "@nestjs/common";
import { AttendeeService } from "../service/attendee.service";


@Controller('attendee')
export class AttendeeController {
    constructor(private readonly attendeeService: AttendeeService) {}

    @Post()
    async create(@Body() body) {
        return this.attendeeService.createAttendee(body)
    }



}