import { Module } from '@nestjs/common';
import { AsignaturaService } from './asignatura.service';
import { AsignaturaController } from './asignatura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asignatura } from './entities/asignatura.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  controllers: [AsignaturaController],
  providers: [AsignaturaService],
  imports: [TypeOrmModule.forFeature([Asignatura]), UsuarioModule],
  exports: [AsignaturaModule, AsignaturaService]
})
export class AsignaturaModule {}
