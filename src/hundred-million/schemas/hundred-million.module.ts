import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HundredMillionController } from '../hundred-million.controller';
import { HundredMillion, HundredMillionSchema } from './hundred-million.schema';
import { HundredMillionService } from './hundred-million.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: HundredMillion.name, schema: HundredMillionSchema }], 'hundredMillion')],
  controllers: [HundredMillionController],
  providers: [HundredMillionService],
  exports: [MongooseModule]
})
export class HundredMillionModule {}
