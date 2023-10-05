import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asignatura } from './entities/asignatura.entity';
import { Repository } from 'typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AsignaturaService {
  constructor(
    @InjectRepository(Asignatura)
    private readonly asignaturaRepository: Repository<Asignatura>,
    private readonly usuarioService: UsuarioService,
  ) {}

  async create(createAsignaturaDto: CreateAsignaturaDto) {
    const { userEmail, ...asignaturaDetail } = createAsignaturaDto;
    const usuario = await this.usuarioService.findOne(userEmail);
    if (usuario) {
      const newAsignatura = this.asignaturaRepository.create(asignaturaDetail);
      newAsignatura.usuario = usuario;
      await this.asignaturaRepository.save(newAsignatura);
      return newAsignatura;
    }
    throw new NotFoundException('Usuario not found');
  }

  findAll() {
    return this.asignaturaRepository.find();
  }

  async findOne(id: number) {
    const asignatura = await this.asignaturaRepository.findOne({
      where: { id },
      relations: ['tareas'],
    });
    if (!asignatura) throw new NotFoundException('Asignatura not found');
    return asignatura;
  }

  async getTareas(id: number) {
    const asignatura = await this.findOne(id);
    if (!asignatura) throw new NotFoundException('Asignatura not found');
    return asignatura.tareas;
  }

  async remove(id: number) {
    const asignatura = await this.findOne(id);
    if (!asignatura) throw new NotFoundException('Asignatura not found');
    try {
      this.asignaturaRepository.remove(asignatura);
      return asignatura;
    } catch (error) {}
  }

  // update(id: number, updateAsignaturaDto: UpdateAsignaturaDto) {
  //   return `This action updates a #${id} asignatura`;
  // }
}
