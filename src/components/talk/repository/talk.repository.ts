import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { UpdateTalkInput } from "../interface/talk.interface";

import { Talk, TalkDocument } from "../schema/talk.schema";

@Injectable()
export class TalkRepository {
    constructor(@InjectModel('Talk') private readonly talkModel: Model<TalkDocument> ) {}

    public create(
        talk
    ): Promise<TalkDocument> {
        return this.talkModel.create({ ...talk })
    }

    public find(
        filter: FilterQuery<TalkDocument>
    ): Promise<TalkDocument[]> {
        return this.talkModel.find(filter).exec();
    }

    public findOne(
        filter: FilterQuery<TalkDocument>
    ): Promise<TalkDocument> {
        return this.talkModel.findOne(filter).exec();
    }

    public findById(
        id: string
    ): Promise<TalkDocument> {
        return this.talkModel.findById(id).populate('attendees').exec();
    }

    async findAllTalks(): Promise<TalkDocument[]> {
        return this.talkModel.find().populate('attendees').exec();
    }

    async updateTalk(id: string, data: Partial<Talk> ): Promise<TalkDocument> {
        return this.talkModel.findByIdAndUpdate(id,  { $set: data }, { new: true });
    }

    async deleteTalk(id: string): Promise<void> {
        await this.talkModel.findByIdAndDelete(id).exec();
    }
    
}