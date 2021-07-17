import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Gender } from '../../common/constants/gender.constant';

export type OneMillionDocument = OneMillion & Document;

@Schema({ timestamps: true })
export class OneMillion {
  @Prop()
  name: string;

  @Prop({ type: Number, min: 0, default: 0, required: false })
  age: number;

  @Prop({ type: Gender, default: Gender.Unknown })
  gender: string;

  @Prop({ type: String, required: false })
  description: string;
}

export const OneMillionSchema = SchemaFactory.createForClass(OneMillion);
