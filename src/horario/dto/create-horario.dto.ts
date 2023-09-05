import { IsString, IsInt } from "class-validator"

export class CreateHorarioDto {

    @IsString()
    dia: string;

    @IsString()
    horaEntrada: string;

    @IsString()
    horaSalida: string;

    @IsInt()
    asignaturaId: number;

}
