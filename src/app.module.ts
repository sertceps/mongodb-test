import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    MongooseModule.forRoot('"mongodb://root:example@localhost:27017/test?authSource=admin"'),
    CatsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
