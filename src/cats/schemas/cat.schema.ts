import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CatDocument = Cat & Document

@Schema()
export class Cat {
    @Prop()
    name: string

    @Prop()
    age: string

    @Prop()
    breed: string
}

export const CatSchema = SchemaFactory.createForClass(Cat)