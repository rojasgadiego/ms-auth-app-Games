import { IsString, IsInt, IsDate } from 'class-validator';

export class CreateTareaDto {
  @IsString()
  descripcion: String;

  @IsInt()
  idAsignatura: number;

  @IsString()
  fechaTermino: String;
}
