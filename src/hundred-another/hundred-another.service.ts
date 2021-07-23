import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HundredAnother, HundredAnotherDocument } from './schemas/hundred-another.schema';

@Injectable()
export class HundredAnotherService implements OnModuleInit {
  constructor(
    @InjectModel(HundredAnother.name)
    private readonly hundredAnotherModel: Model<HundredAnotherDocument>
  ) {}

  async onModuleInit() {
    console.log('hundred another');

    // const totalDocuments = await this.hundredMillionModel.countDocuments();
    // const totalCount = 100000000;
    // const oneBatch = 100000;
    // const diff = totalCount - totalDocuments;
    // if (diff === 0) return;
    // if (diff > 0) {
    //   const mod = diff % oneBatch;
    //   const circles = Math.floor(diff / oneBatch);
    //   for (let i = 0; i < circles; i++) {
    //     const docList = [];
    //     for (let j = 0; j < oneBatch; j++) {
    //       docList.push({ name: '一亿' });
    //     }
    //     console.log('inserting hundred-million');
    //     await this.hundredMillionModel.insertMany(docList);
    //     console.log('插入一批');
    //   }
    //   const docList = [];
    //   for (let j = 0; j < mod; j++) {
    //     docList.push({ name: '一亿' });
    //   }
    //   await this.hundredMillionModel.insertMany(docList);
    // } else {
    //   const mod = -diff % oneBatch;
    //   const circles = Math.floor(-diff / oneBatch);
    //   for (let i = 0; i < circles; i++) {
    //     const docList = await this.hundredMillionModel.find({}).limit(oneBatch);
    //     await Promise.all(docList.map(async v => v.deleteOne({})));
    //   }
    //   const docList = await this.hundredMillionModel.find({}).limit(mod);
    //   await Promise.all(docList.map(async v => v.deleteOne({})));
    // }
  }

  async createOne(doc): Promise<HundredAnotherDocument> {
    const createdHundredMillion = new this.hundredAnotherModel(doc);

    return createdHundredMillion.save();
  }

  async deleteOne(object_id: string): Promise<{ ok?: number; delete?: number } & { deletedCount?: number }> {
    return this.hundredAnotherModel.deleteOne({ _id: object_id });
  }

  async findOne(object_id: string): Promise<HundredAnotherDocument> {
    return this.hundredAnotherModel.findById(object_id);
  }

  async findTen(): Promise<HundredAnotherDocument[]> {
    return this.hundredAnotherModel.find({}).limit(10);
  }
}
