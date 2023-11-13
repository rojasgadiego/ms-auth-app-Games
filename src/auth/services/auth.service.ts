import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { LoginUserDto, CreateUserDto } from '../dto/index';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
    private readonly JwtService: JwtService,
  ) {}

  async register({ email, password, name }: CreateUserDto) {
    let auth = await this.userRepository.findOne({ where: { email } });
    if (auth) {
      return { status: HttpStatus.CONFLICT, error: ['E-Mail already exists'] };
    }
    const usuario = this.userRepository.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    await this.userRepository.save(usuario);
    return { status: HttpStatus.CREATED, error: null };
  }

  // async register(createUserDto: CreateUserDto) {
  //   try {
  //     const { password, ...userData } = createUserDto;
  //     const usuario = this.userRepository.create({
  //       ...userData,
  //       password: bcrypt.hashSync(password, 10),
  //     });
  //     await this.userRepository.save(usuario);
  //     delete usuario.password;
  //     const { id, ...userdetail } = usuario;
  //     return { ...userdetail, token: this.getJwtToken({ id: usuario.id }) };
  //   } catch (error) {
  //     throw new BadRequestException(error.detail);
  //   }
  // }

  async login({ email, password }: LoginUserDto) {
    let userdb = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });
    if (!userdb) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['E-Mail not found'],
        token: null,
      };
    }
    if (!bcrypt.compareSync(password, userdb.password))
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['Password wrong'],
        token: null,
      };
    const token = this.getJwtToken({ id: userdb.id });
    return { status: HttpStatus.OK, error: null, token: token };
  }

  // async login(loginUserDto: LoginUserDto) {
  //   const { password, email } = loginUserDto;
  //   const user = await this.userRepository.findOne({
  //     where: { email },
  //     select: { email: true, password: true, id: true },
  //   });

  //   if (!user)
  //     throw new UnauthorizedException('Credentials are not valid (email)');

  //   if (!bcrypt.compareSync(password, user.password))
  //     throw new UnauthorizedException('Credentials are not valid (password)');

  //   delete user.password;
  //   const { id, ...userdetail } = user;
  //   return { ...userdetail, token: this.getJwtToken({ id: user.id }) };
  // }

  public async validate(token: string) {
    const decoded = await this.JwtService.verify(token);
    if (!decoded) {
      return {
        status: HttpStatus.FORBIDDEN,
        error: ['Token is invalid'],
        userId: null,
      };
    }
    const id = decoded.id;
    const auth = await this.userRepository.findOne({
      where: { id },
    });
    if (!auth) {
      return {
        status: HttpStatus.CONFLICT,
        error: ['User not found'],
        userId: null,
      };
    }
    return { status: HttpStatus.OK, error: null, userId: decoded.id };
  }

  private getJwtToken(payload: { id: number }) {
    const token = this.JwtService.sign(payload);
    return token;
  }
}
