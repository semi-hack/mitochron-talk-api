import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema({
  timestamps: true
})
export class Attendee {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;
}

export const AttendeeSchema = SchemaFactory.createForClass(Attendee);

export type AttendeeDocument = HydratedDocument<Attendee>;