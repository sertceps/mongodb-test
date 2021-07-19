import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Billion, BillionDocument } from './schemas/billion.schema';

@Injectable()
export class BillionService {
  constructor(
    @InjectModel(Billion.name)
    private readonly billionModel: Model<BillionDocument>
  ) {}

  async createOne(name: string, age?: number, gender?: string, description?: string): Promise<BillionDocument> {
    const doc = Object.assign({ name }, age ? { age } : {}, gender ? { gender } : {}, description ? { description } : {});
    const createdBillion = new this.billionModel(doc);

    return createdBillion.save();
  }

  async findOne(object_id: string): Promise<BillionDocument> {
    return this.billionModel.findById(object_id);
  }
}
