import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateAttendeeInput } from "../interface/attendee.interface";
import { AttendeeRepository } from "../repository/attendee.repository";
import { AttendeeDocument } from "../schema/attendee.schema";


@Injectable()
export class AttendeeService {
    constructor(
        private readonly attendeeRepo: AttendeeRepository
    ) {}

    async createAttendee(input: CreateAttendeeInput): Promise<AttendeeDocument> {
        const existingAttendee= await this.attendeeRepo.find({ name: input.name })
        if (existingAttendee.length > 0) {
            throw new BadRequestException('This attendee already exists')
        }
        return this.attendeeRepo.create(input);
    }

    async findById(id: string): Promise<AttendeeDocument> {
        return this.attendeeRepo.findById(id);
    }

    async findTalkById(id: string): Promise<AttendeeDocument> {
        return this.attendeeRepo.findById(id);
    }

    async findAllTalk(): Promise<AttendeeDocument[]> {
        return this.attendeeRepo.findAllAttendee();
    }
}