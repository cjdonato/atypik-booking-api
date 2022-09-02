import { Accommodation } from '../accommodation/accommodation.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name1: string;

  @Column()
  name2: string;

  @OneToMany(() => Accommodation, (accom) => accom.user)
  accommodations: Accommodation[];
}
