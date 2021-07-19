import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TenMillion, TenMillionDocument } from './schemas/ten-million.schema';

@Injectable()
export class TenMillionService implements OnModuleInit {
  constructor(
    @InjectModel(TenMillion.name)
    private readonly tenMillionModel: Model<TenMillionDocument>
  ) {}

  async onModuleInit() {
    const totalDocuments = await this.tenMillionModel.countDocuments();
    const totalCount = 10000000;
    const oneBatch = 100000;
    const diff = totalCount - totalDocuments;
    if (diff === 0) return;
    if (diff > 0) {
      const mod = diff % oneBatch;
      const circles = Math.floor(diff / oneBatch);
      for (let i = 0; i < circles; i++) {
        const docList = [];
        for (let j = 0; j < oneBatch; j++) {
          docList.push({ name: '一千万' });
        }
        console.log(i);
        const result = await this.tenMillionModel.insertMany(docList);
        console.log('插入一批');
      }
      // const docList = Array.from({ length: mod }, v => (v = { name: '一千万' }));
      const docList = [];
      for (let j = 0; j < mod; j++) {
        docList.push({ name: '一千万' });
      }
      await this.tenMillionModel.insertMany(docList);
    } else {
      for (let i = 0; i < -diff; i++) {
        await this.tenMillionModel.deleteOne({});
      }
    }
  }

  async createOne(name: string, age?: number, gender?: string, description?: string): Promise<TenMillionDocument> {
    const doc = Object.assign({ name }, age ? { age } : {}, gender ? { gender } : {}, description ? { description } : {});
    const createdTenMillion = new this.tenMillionModel(doc);

    return createdTenMillion.save();
  }

  async findOne(object_id: string): Promise<TenMillionDocument> {
    return this.tenMillionModel.findById(object_id);
  }
}
