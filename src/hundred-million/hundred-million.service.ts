import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { HundredMillion, HundredMillionDocument } from './schemas/hundred-million.schema';

@Injectable()
export class HundredMillionService implements OnModuleInit {
  constructor(
    @InjectModel(HundredMillion.name)
    private readonly hundredMillionModel: Model<HundredMillionDocument>
  ) {}

  async onModuleInit() {
    const totalDocuments = await this.hundredMillionModel.countDocuments();
    const totalCount = 100000000;
    const oneBatch = 100000;
    const diff = totalCount - totalDocuments;
    if (diff === 0) return;
    if (diff > 0) {
      const mod = diff % oneBatch;
      const circles = Math.floor(diff / oneBatch);
      for (let i = 0; i < circles; i++) {
        const docList = [];
        for (let j = 0; j < oneBatch; j++) {
          docList.push({ name: '一亿' });
        }
        console.log(i);
        await this.hundredMillionModel.insertMany(docList);
        console.log('插入一批');
      }
      const docList = [];
      for (let j = 0; j < mod; j++) {
        docList.push({ name: '一亿' });
      }
      await this.hundredMillionModel.insertMany(docList);
    } else {
      for (let i = 0; i < -diff; i++) {
        await this.hundredMillionModel.deleteOne({});
      }
    }
  }

  async createOne(name: string, age?: number, gender?: string, description?: string): Promise<HundredMillionDocument> {
    const doc = Object.assign({ name }, age ? { age } : {}, gender ? { gender } : {}, description ? { description } : {});
    const createdHundredMillion = new this.hundredMillionModel(doc);

    return createdHundredMillion.save();
  }

  async deleteOne(object_id: string): Promise<{ ok?: number; delete?: number } & { deletedCount?: number }> {
    return this.hundredMillionModel.deleteOne({ _id: object_id });
  }

  async updateOne(object_id: string, doc: { name?: string; age?: number; gender?: string; description?: string }): Promise<UpdateWriteOpResult> {
    return this.hundredMillionModel.updateOne({ _id: object_id }, doc);
  }

  async findOne(object_id: string): Promise<HundredMillionDocument> {
    return this.hundredMillionModel.findById(object_id);
  }
}
