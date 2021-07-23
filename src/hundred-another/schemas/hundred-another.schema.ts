import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HundredAnotherDocument = HundredAnother & Document;

@Schema({ timestamps: true })
export class HundredAnother {
  @Prop()
  serial_number: string;

  @Prop()
  level: string;

  @Prop()
  method: string;

  @Prop()
  url: string;

  @Prop()
  request_message: string;

  @Prop()
  response_code: number;

  @Prop()
  response_message: string;

  @Prop()
  elapsed: number;

  @Prop()
  ip: string;

  @Prop()
  package_version: string;

  @Prop()
  package_upgrade_status: string;

  @Prop()
  setting_version: string;

  @Prop()
  setting_upgrade_status: string;
}

export const HundredAnotherSchema = SchemaFactory.createForClass(HundredAnother);
