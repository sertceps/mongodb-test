import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Billion, BillionDocument } from './schemas/billion.schema';

@Injectable()
export class BillionService implements OnModuleInit {
  constructor(
    @InjectModel(Billion.name)
    private readonly billionModel: Model<BillionDocument>
  ) {}

  async onModuleInit() {
    // const docList = await this.billionModel.find({}).limit(10);
    // console.log(await docList[0].deleteOne({}));
    const totalDocuments = await this.billionModel.countDocuments();
    const totalCount = 1000000000;
    const oneBatch = 100000;
    const diff = totalCount - totalDocuments;
    if (diff === 0) return;

    if (diff > 0) {
      const mod = diff % oneBatch;
      const circles = Math.floor(diff / oneBatch);
      for (let i = 0; i < circles; i++) {
        const docList = [];
        for (let j = 0; j < oneBatch; j++) {
          docList.push({ name: '十亿' });
        }
        await this.billionModel.insertMany(docList);
        console.log('插入一批');
      }
      const docList = [];
      for (let j = 0; j < mod; j++) {
        docList.push({ name: '十亿' });
      }
      await this.billionModel.insertMany(docList);
    } else {
      const mod = -diff % oneBatch;
      const circles = Math.floor(-diff / oneBatch);
      for (let i = 0; i < circles; i++) {
        const docList = await this.billionModel.find({}).limit(oneBatch);
        await Promise.all(docList.map(async v => v.deleteOne({})));
      }
      const docList = await this.billionModel.find({}).limit(mod);
      await Promise.all(docList.map(async v => v.deleteOne({})));
    }
  }

  async createOne(name: string, age?: number, gender?: string, description?: string): Promise<BillionDocument> {
    const doc = Object.assign({ name }, age ? { age } : {}, gender ? { gender } : {}, description ? { description } : {});
    const createdBillion = new this.billionModel(doc);

    return createdBillion.save();
  }

  async findOne(object_id: string): Promise<BillionDocument> {
    return this.billionModel.findById(object_id);
  }
}
