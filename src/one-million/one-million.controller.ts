import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateReqDto } from '../common/dtos/create.req.dto';
import { GetResDto } from '../common/dtos/get.res.dto';
import { ObjectIdReqDto } from '../common/dtos/object-id.req.dto';
import { ObjectIdResDto } from '../common/dtos/object-id.res.dto';
import { OneMillionService } from './one-million.service';

@Controller('one-million')
export class OneMillionController {
  constructor(private readonly oneMillionService: OneMillionService) {}

  @Post()
  async createOne(@Body() body: CreateReqDto): Promise<ObjectIdResDto> {
    const doc = await this.oneMillionService.createOne(body.name, body.age, body.gender);
    return { object_id: doc._id };
  }

  @Get(':object_id')
  async findOne(@Param() { object_id }: ObjectIdReqDto): Promise<GetResDto> {
    return await this.oneMillionService.findOne(object_id);
  }
}
