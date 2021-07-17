import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateReqDto } from '../common/dtos/create.req.dto';
import { ObjectIdReqDto } from '../common/dtos/object-id.req.dto';
import { ObjectIdResDto } from '../common/dtos/object-id.res.dto';
import { OneMillionService } from './one-million.service';
import { OneMillionDocument } from './schemas/one-million.schemas';

@Controller('one-million')
export class OneMillionController {
  constructor(private readonly oneMillionService: OneMillionService) {}

  @Post()
  async createOne(@Body() body: CreateReqDto): Promise<ObjectIdResDto> {
    return await this.oneMillionService.createOne(body.name, body.age, body.gender);
  }

  @Get()
  async findOne(@Param() { object_id }: ObjectIdReqDto): Promise<OneMillionDocument> {
    return await this.oneMillionService.findOne(object_id);
  }
}
