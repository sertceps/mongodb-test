import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TenMillion, TenMillionSchema } from './schemas/ten-million.schema';
import { TenMillionController } from './ten-million.controller';
import { TenMillionService } from './ten-million.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: TenMillion.name, schema: TenMillionSchema }], 'tenMillion')],
  controllers: [TenMillionController],
  providers: [TenMillionService]
})
export class TenMillionModule {}
