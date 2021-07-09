import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { CatDocument, Cat } from "./schemas/cat.schema";

@Injectable()
export class CatsService {
    constructor(

        @InjectConnection()
        private readonly connection: Connection,

        @InjectModel(Cat.name)
        private readonly catModel: Model<CatDocument>
    ) { }


    async findAll() {
        return this.catModel.find().exec()
    }
}