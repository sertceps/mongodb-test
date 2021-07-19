import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateReqDto } from '../common/dtos/create.req.dto';
import { CreateResDto } from '../common/dtos/create.res.dto';
import { ObjectIdReqDto } from '../common/dtos/object-id.req.dto';
import { ObjectIdResDto } from '../common/dtos/object-id.res.dto';
import { HundredMillionService } from './schemas/hundred-million.service';

@Controller('hundred-million')
export class HundredMillionController {
  constructor(private readonly hundredMillionService: HundredMillionService) {}

  @Post()
  async createOne(@Body() body: CreateReqDto): Promise<ObjectIdResDto> {
    const doc = await this.hundredMillionService.createOne(body.name, body.age, body.gender, body.description);
    return { object_id: doc._id };
  }

  @Get(':object_id')
  async findOne(@Param() { object_id }: ObjectIdReqDto): Promise<CreateResDto> {
    return this.hundredMillionService.findOne(object_id);
  }
}
