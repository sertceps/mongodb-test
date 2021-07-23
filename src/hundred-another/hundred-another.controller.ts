import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AffectedResDto } from '../common/dtos/affected.res.dto';
import { CreateHundredAnotherReqDto } from '../common/dtos/create-hundred-another-req.dto';
import { ObjectIdReqDto } from '../common/dtos/object-id.req.dto';
import { ObjectIdResDto } from '../common/dtos/object-id.res.dto';
import { HundredAnotherService } from './hundred-another.service';

@Controller('hundred-another')
export class HundredAnotherController {
  constructor(private readonly hundredAnotherService: HundredAnotherService) {}

  @Post()
  async createOne(@Body() body: CreateHundredAnotherReqDto): Promise<ObjectIdResDto> {
    const doc = await this.hundredAnotherService.createOne(body);

    return { object_id: doc._id };
  }

  @Delete(':object_id')
  async deleteOneById(@Param() { object_id }: ObjectIdReqDto): Promise<AffectedResDto> {
    const { deletedCount } = await this.hundredAnotherService.deleteOne(object_id);
    return { affected: deletedCount };
  }

  @Get(':object_id')
  async findOne(@Param() { object_id }: ObjectIdReqDto): Promise<any> {
    return this.hundredAnotherService.findOne(object_id);
  }
}
