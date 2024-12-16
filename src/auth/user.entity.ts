import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AuthUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
