import { Module } from '@nestjs/common';
import { TareaService } from './tarea.service';
import { TareaController } from './tarea.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from './entities/tarea.entity';

@Module({
  controllers: [TareaController],
  providers: [TareaService],
  imports: [ TypeOrmModule.forFeature([Tarea])]
})
export class TareaModule {}
