import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AsignaturaService } from './asignatura.service';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Asignatura')
@Controller('asignatura')
@UseGuards(JwtAuthGuard)
export class AsignaturaController {
  constructor(private readonly asignaturaService: AsignaturaService) {}

  @Post()
  create(@Body() createAsignaturaDto: CreateAsignaturaDto) {
    return this.asignaturaService.create(createAsignaturaDto);
  }

  @Get()
  findAll() {
    return this.asignaturaService.findAll();
  }

  @Get('/tareas/:id')
  findAsignaturas(@Param('id') id: number) {
    return this.asignaturaService.getTareas(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.asignaturaService.findOne(id);
  }

  @Delete()
  remove(@Body('id') id: number) {
    return this.asignaturaService.remove(+id);
  }
}
