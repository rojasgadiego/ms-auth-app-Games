import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Tarea } from 'src/tarea/entities/tarea.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity()
export class Asignatura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  titulo: string;

  @Column('text')
  instructor?: string;

  @Column('text')
  sala?: string;

  @Column('text')
  nrc?: string;

  @OneToMany(() => Tarea, (tarea) => tarea.asignatura, {
    onDelete: 'CASCADE',
  })
  tareas?: Tarea[];

  @ManyToOne(() => Usuario, (usuario) => usuario.asignaturas)
  usuario: Usuario;
}
