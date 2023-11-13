import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async createUser(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const newUser = await this.usuarioRepository.create(createUsuarioDto);
    return newUser;
  }

  async saveUser(newUser: Usuario): Promise<Usuario> {
    return this.usuarioRepository.save(newUser);
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

  async findByEmail(email: string): Promise<Usuario> {
    return this.usuarioRepository.findOne({
      where: {
        email,
      },
      select: { password: true, name: true, email: true },
    });
  }
}
