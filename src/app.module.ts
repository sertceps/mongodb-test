import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OneMillionModule } from './one-million/one-million.module';
import { TenMillionModule } from './ten-million/ten-million.module';
import { HundredMillionModule } from './hundred-million/schemas/hundred-million.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/one-million', { connectionName: 'oneMillion' }),
    MongooseModule.forRoot('mongodb://localhost:27017/ten-million', { connectionName: 'tenMillion' }),
    MongooseModule.forRoot('mongodb://localhost:27017/hundred-million', { connectionName: 'hundredMillion' }),
    MongooseModule.forRoot('mongodb://localhost:27017/billion', { connectionName: 'billion' }),
    OneMillionModule,
    TenMillionModule,
    HundredMillionModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
