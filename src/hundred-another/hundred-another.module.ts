import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HundredAnotherController } from './hundred-another.controller';
import { HundredAnother, HundredAnotherSchema } from './schemas/hundred-another.schema';
import { HundredAnotherService } from './hundred-another.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: HundredAnother.name, schema: HundredAnotherSchema }], 'hundredAnother')],
  controllers: [HundredAnotherController],
  providers: [HundredAnotherService]
})
export class HundredAnotherModule {}
