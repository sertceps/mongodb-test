import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AffectedResDto } from '../common/dtos/affected.res.dto';
import { CreateOrUpdateReqDto } from '../common/dtos/create-or-update.req.dto';
import { GetResDto } from '../common/dtos/get.res.dto';
import { ObjectIdReqDto } from '../common/dtos/object-id.req.dto';
import { ObjectIdResDto } from '../common/dtos/object-id.res.dto';
import { OneMillionService } from './one-million.service';

@Controller('one-million')
export class OneMillionController {
  constructor(private readonly oneMillionService: OneMillionService) {}

  @Get()
  async echoTest() {
    return 'hello-world';
  }

  @Post()
  async createOne(@Body() body: CreateOrUpdateReqDto): Promise<ObjectIdResDto> {
    const doc = await this.oneMillionService.createOne(body.name, body.age, body.gender);

    return { object_id: doc._id };
  }

  @Delete(':object_id')
  async deleteOne(@Param() { object_id }: ObjectIdReqDto): Promise<AffectedResDto> {
    const { deletedCount } = await this.oneMillionService.deleteOne(object_id);
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

    const { nModified } = await this.oneMillionService.updateOne(object_id, doc);
    return { affected: nModified };
  }

  @Get(':object_id')
  async findOne(@Param() { object_id }: ObjectIdReqDto): Promise<GetResDto> {
    return await this.oneMillionService.findOne(object_id);
  }
}
