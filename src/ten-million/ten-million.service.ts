import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TenMillion, TenMillionDocument } from './schemas/ten-million.schema';

@Injectable()
export class TenMillionService {
  constructor(
    @InjectModel(TenMillion.name)
    private readonly tenMillionModel: Model<TenMillionDocument>
  ) {}

  async createOne(name: string, age?: number, gender?: string, description?: string) {
    const doc = Object.assign({ name }, age ? { age } : {}, gender ? { gender } : {}, description ? { description } : {});
    const createdTenMillion = new this.tenMillionModel(doc);

    return createdTenMillion.save();
  }

  async findOne(object_id: string) {
    return this.tenMillionModel.findById(object_id);
  }
}
