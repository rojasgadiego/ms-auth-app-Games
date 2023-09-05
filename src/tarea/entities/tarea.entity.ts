import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";

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
    fechaIngreso: Date;

    @Column({
      type: 'date',
    })
    fechaTermino: Date;

    @Column('text')
    estado: String;

    @Column({
        type: 'date',
      })
    fechaActualizacionEstado: Date;

    @Column('bool')
    finalizada: boolean;

}
