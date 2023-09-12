import { IsString, IsInt, IsOptional } from "class-validator"

export class CreateAsignaturaDto {

    @IsString()
    titulo: string;

    @IsString()
    instructor: string;

    @IsString()
    @IsOptional()
    sala: string;

    @IsString()
    @IsOptional()
    nrc: string;

    @IsString()
    userEmail: string;

}
