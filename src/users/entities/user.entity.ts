import { Column, DeleteDateColumn, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class UserTimely {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 500 })
  name: string;
  @Column({ unique: true, nullable: false })
  email: string;
  @Column({ nullable: false })
  password: string;
  @Column({ length: 500 })
  salon: string;
  @Column({ default: "user" })
  rol: string;
  @Column()
  isVerified: boolean;
  @DeleteDateColumn()
  deletedAt: Date;
}
