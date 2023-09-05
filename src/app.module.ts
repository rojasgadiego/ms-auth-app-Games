import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsignaturaModule } from './asignatura/asignatura.module';
import { UsuarioModule } from './usuario/usuario.module';
import { HorarioModule } from './horario/horario.module';
import { TareaModule } from './tarea/tarea.module';
import { CalificacionModule } from './calificacion/calificacion.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AsignaturaModule, 
    UsuarioModule, 
    HorarioModule, TareaModule, CalificacionModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
