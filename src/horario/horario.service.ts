import { Injectable,BadRequestException,NotFoundException } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { Horario } from './entities/horario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsignaturaService } from 'src/asignatura/asignatura.service';

@Injectable()
export class HorarioService {

  constructor(
    @InjectRepository(Horario)
    private readonly horarioRepository: Repository<Horario>,
    private readonly asignaturaService: AsignaturaService
  ) 
  {}

  async create(createHorarioDto: CreateHorarioDto){
    const { asignaturaId, ...horariodetail} = createHorarioDto;
    const asignatura = await this.asignaturaService.findOne(asignaturaId);
    if (asignatura) {
      const newHorario = this.horarioRepository.create(horariodetail);
      newHorario.asignatura = asignatura;
      await this.horarioRepository.save(newHorario);
      return newHorario;
    }
    throw new BadRequestException()
  }

  findAll() {
    return this.horarioRepository.find();
  }

  findOne(id: number) {
    const horario = this.horarioRepository.findOne({where: {id}});
    if (!horario) throw new NotFoundException('Horario not found');
    return horario;
  }

  update(id: number, updateHorarioDto: UpdateHorarioDto) {
    return `This action updates a #${id} horario`;
  }

  async remove(id: number) {
    const horario = await this.findOne(id);
    if (!horario) throw new NotFoundException('Horario not found');
    this.horarioRepository.remove(horario);
  }
}
