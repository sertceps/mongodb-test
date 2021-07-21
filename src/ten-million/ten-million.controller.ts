import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AffectedResDto } from '../common/dtos/affected.res.dto';
import { CreateOrUpdateReqDto } from '../common/dtos/create-or-update.req.dto';
import { GetResDto } from '../common/dtos/get.res.dto';
import { ObjectIdReqDto } from '../common/dtos/object-id.req.dto';
import { ObjectIdResDto } from '../common/dtos/object-id.res.dto';
import { TenMillionService } from './ten-million.service';

@Controller('ten-million')
export class TenMillionController {
  constructor(private readonly tenMillionService: TenMillionService) {}

  @Post()
  async createOne(@Body() body: CreateOrUpdateReqDto): Promise<ObjectIdResDto> {
    const doc = await this.tenMillionService.createOne(body.name, body.age, body.gender, body.description);

    return { object_id: doc._id };
  }

  @Delete(':object_id')
  async deleteOne(@Param() { object_id }: ObjectIdReqDto): Promise<AffectedResDto> {
    const { deletedCount } = await this.tenMillionService.deleteOne(object_id);
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

    const { nModified } = await this.tenMillionService.updateOne(object_id, doc);
    return { affected: nModified };
  }

  @Get(':object_id')
  async findOne(@Param() { object_id }: ObjectIdReqDto): Promise<GetResDto> {
    return await this.tenMillionService.findOne(object_id);
  }
}
