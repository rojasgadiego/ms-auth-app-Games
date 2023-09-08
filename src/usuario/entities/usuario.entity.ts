import { Asignatura } from 'src/asignatura/entities/asignatura.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  fullName: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @OneToMany(() => Asignatura, (asignatura) => asignatura.usuario, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  asignaturas?: Asignatura[];
}
