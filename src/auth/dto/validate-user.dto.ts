import { IsString } from 'class-validator';

export class ValidateUserDto {
  @IsString()
  public readonly token: string;
}
