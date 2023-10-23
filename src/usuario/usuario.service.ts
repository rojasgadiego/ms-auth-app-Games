import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  async findOne(email: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { email },
    });
    if (!usuario) throw new NotFoundException('usuario not found');
    return usuario;
  }

  async getAsignaturas(email: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { email },
      relations: ['asignaturas'],
    });
    if (!usuario) throw new NotFoundException('usuario not found');
    const { asignaturas, ...userdetial } = usuario;
    return asignaturas;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

}
