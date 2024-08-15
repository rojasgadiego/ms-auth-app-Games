import { IsEmail, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
