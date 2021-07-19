import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OneMillion, OneMillionDocument } from './schemas/one-million.schemas';

@Injectable()
export class OneMillionService implements OnModuleInit {
  constructor(@InjectModel(OneMillion.name) private readonly oneMillionModel: Model<OneMillionDocument>) {}

  async onModuleInit() {
    const totalDocuments = await this.oneMillionModel.countDocuments();
    const totalCount = 1000000;
    const diff = totalCount - totalDocuments;
    if (diff === 0) return;
    if (diff > 0) {
      const docList = Array.from({ length: diff }, v => (v = { name: '一百万' }));
      await this.oneMillionModel.insertMany(docList);
    } else {
      for (let i = 0; i < -diff; i++) {
        await this.oneMillionModel.deleteOne({});
      }
    }
  }

  async createOne(name: string, age?: number, gender?: string, description?: string): Promise<OneMillionDocument> {
    const doc = Object.assign({ name }, age ? { age } : {}, gender ? { gender } : {}, description ? { description } : {});
    const createdOneMillion = new this.oneMillionModel(doc);

    return createdOneMillion.save();
  }

  async findOne(objectId: string): Promise<OneMillionDocument> {
    return this.oneMillionModel.findById(objectId);
  }
}
