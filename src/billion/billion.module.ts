import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BillionController } from './billion.controller';
import { BillionService } from './billion.service';
import { Billion, BillionSchema } from './schemas/billion.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Billion.name, schema: BillionSchema }], 'billion')],
  controllers: [BillionController],
  providers: [BillionService]
})
export class BillionModule {}
