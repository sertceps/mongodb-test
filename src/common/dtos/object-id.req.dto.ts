import { IsMongoId } from 'class-validator';

export class ObjectIdReqDto {
  @IsMongoId({ message: 'object id 格式不正确' })
  object_id: string;
}
