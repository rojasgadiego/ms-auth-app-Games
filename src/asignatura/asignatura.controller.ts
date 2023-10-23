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
@ApiTags('Asignaturas')
@Controller('asignaturas')
@UseGuards(JwtAuthGuard)
export class AsignaturaController {
  constructor(private readonly asignaturaService: AsignaturaService) {}

  @Post('add')
  create(@Body() createAsignaturaDto: CreateAsignaturaDto) {
    return this.asignaturaService.create(createAsignaturaDto);
  }

  @Get('find/all')
  findAll() {
    return this.asignaturaService.findAll();
  }

  @Get('/find/:id')
  findOne(@Param('id') id: number) {
    return this.asignaturaService.findOne(id);
  }


  @Get(':id/tareas')
  findTareasbyAsignatura(@Param('id') id: number) {
    return this.asignaturaService.getTareas(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.asignaturaService.remove(+id);
  }
}
