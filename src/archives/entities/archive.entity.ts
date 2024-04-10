
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SalonTimely } from 'src/salon/entities/salon.entity';
import { ServicioTimely } from 'src/servicios/entities/servicio.entity';

@Entity()
export class ArchiveTimely {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  filename: string;
  @Column()
  salonId: number;
  @Column()
  servicioId: number;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;
  @ManyToOne(() => SalonTimely, (salon) => salon.archives)
  salon: SalonTimely;
  @ManyToOne(() => ServicioTimely, (servicio) => servicio.archives)
  servicio: ServicioTimely;
}
