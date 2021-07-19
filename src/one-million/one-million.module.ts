import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OneMillionController } from './one-million.controller';
import { OneMillionService } from './one-million.service';
import { OneMillion, OneMillionSchema } from './schemas/one-million.schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: OneMillion.name, schema: OneMillionSchema }], 'oneMillion')],
  controllers: [OneMillionController],
  providers: [OneMillionService]
})
export class OneMillionModule {}
