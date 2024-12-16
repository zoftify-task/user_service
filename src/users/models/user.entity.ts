import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
}
