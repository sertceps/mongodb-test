import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CatDocument = Cat & Document;

@Schema({ timestamps: true })
export class Cat {
    @Prop()
    name: string;

    @Prop({ type: Number, min: 0, default: 0 })
    age: number;

    @Prop({ type: Date, default: Date.now() })
    createAt: Date;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
