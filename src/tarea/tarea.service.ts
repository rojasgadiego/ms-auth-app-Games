import { Injectable, BadRequestException, NotFoundException} from '@nestjs/common';
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
    const { idAsignatura, ...tareadetail } = createTareaDto;
    const asignatura = await this.asignaturaService.findOne(idAsignatura);
    if (asignatura) {
      const newTartea = this.tareaRepository.create(tareadetail);
      newTartea.asignatura = asignatura;
      await this.tareaRepository.save(newTartea);
      return newTartea;
    }
    throw new BadRequestException();
  }

  findAll() {
    return this.tareaRepository.find();
  }

  async findOne(id: number) {
    const tarea = await this.tareaRepository.findOne({
      where: { id },
    });
    if (!tarea) throw new NotFoundException('Tarea not found');
    return tarea;
  }

  async update(id: number, updateTareaDto: UpdateTareaDto) {
    const tarea = await this.tareaRepository.preload({
      id: id,
      ...updateTareaDto,
    });

    if (!tarea) throw new NotFoundException(`Tarea whit id: ${id} not found`);

    try {
      await this.tareaRepository.save(tarea);
      return tarea;
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    const tarea = await this.findOne(id);
    if (!tarea) throw new NotFoundException('Tarea not found');
    this.tareaRepository.remove(tarea);
    return tarea;
  }
}
