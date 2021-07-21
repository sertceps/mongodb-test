import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrUpdateReqDto {
  @IsString({ message: '姓名格式不正确' })
  name: string;

  @IsString({ message: '性别格式不正确' })
  @IsOptional()
  gender: string;

  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: '年龄格式不正确' })
  @Type(() => Number)
  @IsOptional()
  age: number;

  @IsString({ message: '个人介绍格式不正确' })
  @IsOptional()
  description: string;
}
