import { ArchiveTimely } from 'src/archives/entities/archive.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity()
export class ServicioTimely {
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
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;
    @OneToMany(() => ArchiveTimely, (archive) => archive.servicio)
    archives: ArchiveTimely;
}
