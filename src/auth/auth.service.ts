import { Injectable , BadRequestException, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt  from 'bcrypt'
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { LoginUserDto, CreateUserDto } from './dto/index';

@Injectable()
export class AuthService {

  constructor( @InjectRepository(Usuario)
  private readonly userRepository: Repository<Usuario>,
  private readonly JwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const usuario = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10)
      });
      await this.userRepository.save(usuario);
      delete usuario.password;
      const { id, ...userdetail} = usuario;
      return {...userdetail,
        token: this.getJwtToken({id: usuario.id})};
    } catch (error) {
      throw new BadRequestException(error.detail)
    }
  }

  async login(loginUserDto: LoginUserDto){
      const { password, email } = loginUserDto;
      const user = await this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true, id: true}
      });

      if (!user) 
        throw new UnauthorizedException('Credentials are not valid (email)')

      if (! bcrypt.compareSync( password, user.password)) 
        throw new UnauthorizedException('Credentials are not valid (password)')

      delete user.password;
      const { id, ...userdetail} = user;
      return {...userdetail,
      token: this.getJwtToken({id: user.id})};
  }


  private getJwtToken ( payload: { id: number}) {
    const token = this.JwtService.sign( payload );
    return token;
  }




}
