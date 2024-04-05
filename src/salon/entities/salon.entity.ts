import { Archive } from 'src/archives/entities/archive.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity()
export class Salon {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  nombre: string;
  @Column()
  descripcion: string;
  @Column()
  capacidad: number;
  @Column()
  ubicacion: number;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;
  @OneToMany(() => Archive, (archive) => archive.salon)
  archives: Archive;
}
