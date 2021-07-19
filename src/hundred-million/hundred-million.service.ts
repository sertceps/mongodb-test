import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HundredMillion, HundredMillionDocument } from './schemas/hundred-million.schema';

@Injectable()
export class HundredMillionService {
  constructor(
    @InjectModel(HundredMillion.name)
    private readonly hundredMillionModel: Model<HundredMillionDocument>
  ) {}

  async createOne(name: string, age?: number, gender?: string, description?: string): Promise<HundredMillionDocument> {
    const doc = Object.assign({ name }, age ? { age } : {}, gender ? { gender } : {}, description ? { description } : {});
    const createdHundredMillion = new this.hundredMillionModel(doc);

    return createdHundredMillion.save();
  }

  async findOne(object_id: string): Promise<HundredMillionDocument> {
    return this.hundredMillionModel.findById(object_id);
  }
}
