import { IsEmail, IsString } from "class-validator";

export class CreateUsuarioDto {

    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsString()
    password



}
