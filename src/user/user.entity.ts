import { Accommodation } from 'src/accommodation/accommodation.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Accommodation, (accom) => accom.user)
  accommodations: Accommodation[];
}
