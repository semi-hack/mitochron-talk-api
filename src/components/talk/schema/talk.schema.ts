import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

@Schema({
  timestamps: true
})
export class Talk {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  link: string;

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'Attendee' }])
  attendees: Types.ObjectId[];

  @Prop({ type: Boolean, default: false })
  deleted: string;
}

export const TalkSchema = SchemaFactory.createForClass(Talk);

export type TalkDocument = HydratedDocument<Talk>;