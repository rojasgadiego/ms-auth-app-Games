import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Asignatura } from 'src/asignatura/entities/asignatura.entity'; 

@Entity()
export class Horario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    dia: string;

    @Column('text')
    horaEntrada: string;

    @Column('text')
    horaSalida: string;

    @ManyToOne(
        () => Asignatura, 
        (Asignatura) => Asignatura.horarios
    )
    asignatura: Asignatura

}