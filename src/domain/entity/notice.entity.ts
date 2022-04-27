import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Lecture } from './lecture.entity';

@Entity('notice')
export class Notice {
  @PrimaryGeneratedColumn()
  idx!: number;

  @RelationId((notice: Notice) => notice.lecture)
  lectureIdx!: number;

  @JoinColumn({ name: 'fk_lecture_idx' })
  @ManyToOne(() => Lecture, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  lecture!: Lecture;

  @Column({
    name: 'expire_date',
    nullable: false,
  })
  expireDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
