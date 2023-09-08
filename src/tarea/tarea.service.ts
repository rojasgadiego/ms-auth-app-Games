import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarea } from './entities/tarea.entity';
import { Repository } from 'typeorm';
import { AsignaturaService } from 'src/asignatura/asignatura.service';

@Injectable()
export class TareaService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
    private readonly asignaturaService: AsignaturaService,
  ) {}

  async create(createTareaDto: CreateTareaDto) {
    const { idAsignatura, ...horariodetail } = createTareaDto;
    const asignatura = await this.asignaturaService.findOne(idAsignatura);
    if (asignatura) {
      const newTartea = this.tareaRepository.create(horariodetail);
      newTartea.asignatura = asignatura;
      await this.tareaRepository.save(newTartea);
      return newTartea;
    }
    throw new BadRequestException();
  }

  findAll() {
    return `This action returns all tarea`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tarea`;
  }

  update(id: number, updateTareaDto: UpdateTareaDto) {
    return `This action updates a #${id} tarea`;
  }

  remove(id: number) {
    return `This action removes a #${id} tarea`;
  }
}
