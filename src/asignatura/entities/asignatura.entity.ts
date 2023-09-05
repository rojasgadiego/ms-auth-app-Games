import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Horario } from "src/horario/entities/horario.entity";
import { Tarea } from "src/tarea/entities/tarea.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";

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

    @Column('int')
    nrc?: string;

    @OneToMany(
        () => Horario,
        (horario) => horario.asignatura,
        { onDelete: 'CASCADE'}
    )
    horarios?: Horario[];

    @ManyToOne(
        () => Usuario, 
        (usuario) => usuario.asignaturas
    )
    usuario: Usuario;

}


