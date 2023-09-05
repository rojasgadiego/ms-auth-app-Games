import { Module } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { HorarioController } from './horario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Horario } from './entities/horario.entity';
import { AsignaturaModule } from 'src/asignatura/asignatura.module';

@Module({
  controllers: [HorarioController],
  providers: [HorarioService],
  imports: [TypeOrmModule.forFeature([Horario]), AsignaturaModule],
})
export class HorarioModule {}
