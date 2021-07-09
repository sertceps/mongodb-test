import { MongooseModule } from "@nestjs/mongoose";
import { CatsController } from "./cats.controller";
import { CatSchema, Cat } from "./schemas/cat.schema";
import { CatsService } from "./cats.service"
import { Module } from "@nestjs/common";

@Module({
    imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
    controllers: [CatsController],
    providers: [CatsService],
})
export class CatsModule { }