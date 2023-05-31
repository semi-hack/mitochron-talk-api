import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";

import { Attendee, AttendeeDocument} from "../schema/attendee.schema";

@Injectable()
export class AttendeeRepository {
    constructor(@InjectModel('Attendee') private readonly attendeeModel: Model<Attendee> ) {}

    public create(
        attendee
    ): Promise<AttendeeDocument> {
        return this.attendeeModel.create({ ...attendee })
    }

    public find(
        filter: FilterQuery<AttendeeDocument>
    ): Promise<AttendeeDocument[]> {
        return this.attendeeModel.find(filter).exec();
    }

    public findById(
        id: string
    ): Promise<AttendeeDocument> {
        return this.attendeeModel.findById(id).exec();
    }

    async findAllAttendee(): Promise<AttendeeDocument[]> {
        return this.attendeeModel.find().exec();
    }
}