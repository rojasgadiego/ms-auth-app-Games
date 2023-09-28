import { PartialType } from '@nestjs/mapped-types';
import { CreateTareaDto } from './create-tarea.dto';
import { IsString } from 'class-validator';

export class UpdateTareaDto extends PartialType(CreateTareaDto) {
  @IsString()
  estado: String;
}
