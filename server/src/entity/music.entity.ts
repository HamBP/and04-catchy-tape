import {
  Column,
  Entity,
  CreateDateColumn,
  BaseEntity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Genres } from 'src/constants';

@Entity({ name: 'music' })
export class Music extends BaseEntity {
  @PrimaryGeneratedColumn()
  musicId: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  lyrics: string | null;

  @Column()
  cover: string;

  @Column()
  musicFile: string;

  @Column()
  genre: Genres;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: string;
}
