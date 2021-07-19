import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Gender } from '../../common/constants/gender.constant';

export type BillionDocument = Billion & Document;

@Schema({ timestamps: true })
export class Billion {
  @Prop()
  name: string;

  @Prop({ type: Number, min: 0, default: 0, required: false })
  age: number;

  @Prop({ type: String, default: Gender.Unknown, required: false })
  gender: string;

  @Prop({ type: String, required: false })
  description: string;
}

export const BillionSchema = SchemaFactory.createForClass(Billion);
