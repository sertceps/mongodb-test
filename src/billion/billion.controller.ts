import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateReqDto } from '../common/dtos/create.req.dto';
import { GetResDto } from '../common/dtos/get.res.dto';
import { ObjectIdReqDto } from '../common/dtos/object-id.req.dto';
import { ObjectIdResDto } from '../common/dtos/object-id.res.dto';
import { BillionService } from './billion.service';

@Controller('billion')
export class BillionController {
  constructor(private readonly billionService: BillionService) {}

  @Post()
  async createOne(@Body() body: CreateReqDto): Promise<ObjectIdResDto> {
    const doc = await this.billionService.createOne(body.name, body.age, body.gender, body.description);

    return { object_id: doc._id };
  }

  @Get(':object_id')
  async findOne(@Param() { object_id }: ObjectIdReqDto): Promise<GetResDto> {
    return await this.billionService.findOne(object_id);
  }
}
