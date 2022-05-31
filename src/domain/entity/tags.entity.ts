import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Lecture } from './lecture.entity';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn({
    name: 'idx',
  })
  idx!: number;

  @Column({
    name: 'name',
    nullable: false,
  })
  name!: string;

  @RelationId((tags: Tags) => tags.lecture)
  lectureIdx!: number;

  @JoinColumn({ name: 'fk_lecture_idx' })
  @ManyToOne(() => Lecture, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  lecture!: Lecture;
}
