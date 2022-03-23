import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Lecture } from './lecture.entity';
import { User } from './user.entity';

@Entity('application')
export class Application {
  @PrimaryGeneratedColumn({
    name: 'idx',
  })
  idx!: number;

  @RelationId((application: Application) => application.user)
  uniqueId!: string;

  @JoinColumn({ name: 'fk_unique_id' })
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user!: User;

  @RelationId((application: Application) => application.lecture)
  lectureIdx!: number;

  @JoinColumn({ name: 'fk_lecture_idx' })
  @ManyToOne(() => Lecture, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  lecture!: Lecture;
}
