import { IsNumber, IsString } from 'class-validator';

export class CreateHundredAnotherReqDto {
  @IsString({ message: 'serial_number 格式不正确' })
  serial_number: string;

  @IsString({ message: 'level 格式不正确' })
  level: string;

  @IsString({ message: 'method 格式不正确' })
  method: string;

  @IsString({ message: 'url 格式不正确' })
  url: string;

  @IsString({ message: 'request_message 格式不正确' })
  request_message: string;

  @IsNumber({ allowNaN: false }, { message: 'response_code 格式不正确' })
  response_code: number;

  @IsString({ message: 'response_message 格式不正确' })
  response_message: string;

  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'elapsed 格式不正确' })
  elapsed: number;

  @IsString({ message: 'ip 格式不正确' })
  ip: string;

  @IsString({ message: 'package_version 格式不正确' })
  package_version: string;

  @IsString({ message: 'package_upgrade_status 格式不正确' })
  package_upgrade_status: string;

  @IsString({ message: 'setting_version 格式不正确' })
  setting_version: string;

  @IsString({ message: 'setting_upgrade_status 格式不正确' })
  setting_upgrade_status: string;
}
