import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { OneMillion, OneMillionDocument } from './schemas/one-million.schemas';

@Injectable()
export class OneMillionService implements OnModuleInit {
  constructor(@InjectModel(OneMillion.name) private readonly oneMillionModel: Model<OneMillionDocument>) {}

  async onModuleInit() {
    console.log('one-million skipped');

    // const totalDocuments = await this.oneMillionModel.countDocuments();
    // const totalCount = 1000000;
    // const oneBatch = 100000;
    // const diff = totalCount - totalDocuments;
    // if (diff === 0) return;
    // if (diff > 0) {
    //   const mod = diff % oneBatch;
    //   const circles = Math.floor(diff / oneBatch);
    //   for (let i = 0; i < circles; i++) {
    //     const docList = [];
    //     for (let j = 0; j < oneBatch; j++) {
    //       docList.push({ name: '一百万' });
    //     }
    //     console.log('inserting one-million');
    //     await this.oneMillionModel.insertMany(docList);
    //     console.log('插入一批');
    //   }
    //   const docList = [];
    //   for (let j = 0; j < mod; j++) {
    //     docList.push({ name: '一百万' });
    //   }
    //   await this.oneMillionModel.insertMany(docList);
    // } else {
    //   const mod = -diff % oneBatch;
    //   const circles = Math.floor(-diff / oneBatch);
    //   for (let i = 0; i < circles; i++) {
    //     const docList = await this.oneMillionModel.find({}).limit(oneBatch);
    //     await Promise.all(docList.map(async v => v.deleteOne({})));
    //   }
    //   const docList = await this.oneMillionModel.find({}).limit(mod);
    //   await Promise.all(docList.map(async v => v.deleteOne({})));
    // }
  }

  async createOne(name: string, age?: number, gender?: string, description?: string): Promise<OneMillionDocument> {
    const doc = Object.assign({ name }, age ? { age } : {}, gender ? { gender } : {}, description ? { description } : {});
    const createdOneMillion = new this.oneMillionModel(doc);

    return createdOneMillion.save();
  }

  async deleteOne(object_id: string): Promise<{ ok?: number; delete?: number } & { deletedCount?: number }> {
    return this.oneMillionModel.deleteOne({ _id: object_id });
  }

  async updateOne(object_id: string, doc: { name?: string; age?: number; gender?: string; description?: string }): Promise<UpdateWriteOpResult> {
    return this.oneMillionModel.updateOne({ _id: object_id }, doc);
  }

  async findOne(objectId: string): Promise<OneMillionDocument> {
    return this.oneMillionModel.findById(objectId);
  }
}
