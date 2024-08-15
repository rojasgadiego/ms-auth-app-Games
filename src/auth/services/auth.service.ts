import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto, CreateUserDto, ValidateUserDto } from '../dto/index';
import { UsuarioService } from 'src/usuario/services/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly JwtService: JwtService,
    private usuarioService: UsuarioService,
  ) {}

  async register({ email, password, nombre }: CreateUserDto) {
    let auth = await this.usuarioService.findOnebyEmail(email);
    if (auth) {
      return { status: HttpStatus.CONFLICT, error: ['E-Mail already exists'] };
    }
    await this.usuarioService.createUser({
      nombre,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    return { status: HttpStatus.CREATED, error: null };
  }

  async login({ email, password }: LoginUserDto) {
    const userdb = await this.usuarioService.findOnebyEmail(email);
    if (!userdb) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['E-Mail not found'],
        token: null,
        idUser: null,
      };
    }
    if (!bcrypt.compareSync(password, userdb.password))
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['Password wrong'],
        token: null,
        idUser: null,
      };
    const token = this.getJwtToken({ id: userdb.id });
    return {
      status: HttpStatus.OK,
      error: null,
      token: token,
      idUser: userdb.id,
    };
  }

  async validate({ token }: ValidateUserDto) {
    try {
      const decoded = await this.JwtService.verify(token);
      if (!decoded) {
        return {
          status: HttpStatus.FORBIDDEN,
          error: ['Token is invalid'],
          userId: null,
        };
      }
      const id = decoded.id;
      const auth = await this.usuarioService.findOneById(id);
      if (!auth) {
        return {
          status: HttpStatus.CONFLICT,
          error: ['User not found'],
          userId: null,
        };
      }
      return { status: HttpStatus.OK, error: null, userId: auth.id };
    } catch (error) {
      return {
        status: HttpStatus.FORBIDDEN,
        error: ['Token is invalid'],
        userId: null,
      };
    }
  }

  async findUserbyId(payload) {
    const userdb = await this.usuarioService.findOneById(payload.id);
    if (!userdb) {
      return {
        status: HttpStatus.CONFLICT,
        error: ['User not found'],
        userId: null,
      };
    }
    return { status: HttpStatus.OK, error: null, user: userdb };
  }

  private getJwtToken(payload: { id: string }) {
    const token = this.JwtService.sign(payload);
    return token;
  }
}
