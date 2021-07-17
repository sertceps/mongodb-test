import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectIdResDto } from '../common/dtos/object-id.res.dto';
import { OneMillion, OneMillionDocument } from './schemas/one-million.schemas';

@Injectable()
export class OneMillionService {
  constructor(@InjectModel(OneMillion.name) private readonly oneMillionModel: Model<OneMillionDocument>) {}

  async createOne(name: string, age?: number, gender?: string, description?: string): Promise<ObjectIdResDto> {
    const doc = Object.assign({ name }, age ? { age } : {}, gender ? { gender } : {}, description ? { description } : {});
    const createdOneMillion = new this.oneMillionModel(doc);
    return { object_id: (await createdOneMillion.save())._id };
  }

  async findOne(objectId: string): Promise<OneMillionDocument> {
    return this.oneMillionModel.findById(objectId);
  }
}
