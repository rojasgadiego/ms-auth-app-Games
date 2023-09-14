import { isIn } from 'class-validator';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Tarea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  descripcion: String;

  @Column({
    type: 'date',
    default: () => 'NOW()',
  })
  fechaIngreso?: Date;

  @Column({
    type: 'text',
  })
  fechaTermino?: String;

  @Column({ type: 'text', default: 'Creada' })
  estado?: String;

  @Column({ type: 'bool', default: 'false' })
  finalizada?: boolean;

  @ManyToOne(() => Asignatura, (Asignatura) => Asignatura.tareas)
  asignatura: Asignatura;
}
