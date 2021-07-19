import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender } from '../../common/constants/gender.constant';

export type TenMillionDocument = TenMillion & Document;

@Schema({ timestamps: true })
export class TenMillion {
  @Prop()
  name: string;

  @Prop({ type: Number, min: 0, default: 0, required: false })
  age: number;

  @Prop({ type: String, default: Gender.Unknown, required: false })
  gender: string;

  @Prop({ type: String, required: false })
  description: string;
}

export const TenMillionSchema = SchemaFactory.createForClass(TenMillion);
