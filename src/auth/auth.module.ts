import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtSecret } from './constans';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JwtSecret,
      signOptions: { expiresIn: '2h' },
    }),
    UsuarioModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtModule],
})
export class AuthModule {}
