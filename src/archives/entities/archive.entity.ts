
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Salon } from 'src/salon/entities/salon.entity';

@Entity()
export class Archive {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  filename: string;
  @Column()
  salonId: number;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;
  @ManyToOne(() => Salon, (salon) => salon.archives)
  salon: Salon;
}
