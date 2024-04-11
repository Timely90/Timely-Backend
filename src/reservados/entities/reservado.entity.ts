
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity()
export class ReservadoTimely {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    nombre: string;
    @Column()
    salon: string;
    @Column()
    descripcion: string;
    @Column()
    horario: string;
    @Column()
    precio: number;
    @Column()
    email: string;
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;
}
