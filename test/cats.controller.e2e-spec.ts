import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as supertest from 'supertest';
import { Model } from 'mongoose';
import { Cat, CatDocument } from '../src/cats/schemas/cat.schema';

describe('CatsController (e2e) ', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let catModel: Model<CatDocument>;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    catModel = moduleFixture.get('cats');

    app = moduleFixture.createNestApplication();
    await app.init();

    const objList = [];
    for (let i = 0; i < 100000; i++) {
      objList.push({ name: '张三', age: 18 });
    }

    await catModel.insertMany(objList);
  });

  it('/cats (POST)', async () => {
    const { status } = await supertest(app.getHttpServer()).post('/cats').send({ name: '张三', age: 18 }).set('Accept', 'application/json');
  });
});

// one million 一百万
// 10 million 一千万
// 100 million 一亿
// billion 十亿
