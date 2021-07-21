import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateOrUpdateReqDto } from '../common/dtos/create-or-update.req.dto';
import { AffectedResDto } from '../common/dtos/affected.res.dto';
import { GetResDto } from '../common/dtos/get.res.dto';
import { ObjectIdReqDto } from '../common/dtos/object-id.req.dto';
import { ObjectIdResDto } from '../common/dtos/object-id.res.dto';
import { BillionService } from './billion.service';

@Controller('billion')
export class BillionController {
  constructor(private readonly billionService: BillionService) {}

  @Post()
  async createOne(@Body() body: CreateOrUpdateReqDto): Promise<ObjectIdResDto> {
    const doc = await this.billionService.createOne(body.name, body.age, body.gender, body.description);

    return { object_id: doc._id };
  }

  @Delete(':object_id')
  async deleteOne(@Param() { object_id }: ObjectIdReqDto): Promise<AffectedResDto> {
    const { deletedCount } = await this.billionService.deleteOne(object_id);
    return { affected: deletedCount };
  }

  @Put(':object_id')
  async updateOne(@Param() { object_id }: ObjectIdReqDto, @Body() body: CreateOrUpdateReqDto): Promise<AffectedResDto> {
    const doc = Object.assign(
      { name: body.name },
      body.age ? { age: body.age } : {},
      body.gender ? { gender: body.gender } : {},
      body.description ? { description: body.description } : {}
    );

    const { nModified } = await this.billionService.updateOne(object_id, doc);
    return { affected: nModified };
  }

  @Get(':object_id')
  async findOne(@Param() { object_id }: ObjectIdReqDto): Promise<GetResDto> {
    return await this.billionService.findOne(object_id);
  }
}
