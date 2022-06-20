import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Application } from './application.entity';
import { Notice } from './notice.entity';
import { Place } from './place.entity';
import { Tags } from './tags.entity';
import { User } from './user.entity';

@Entity('lecture')
export class Lecture {
  @PrimaryGeneratedColumn({
    name: 'idx',
  })
  idx!: number;

  @Column({
    name: 'title',
    nullable: false,
  })
  title!: string;

  @Column({
    name: 'content',
    nullable: false,
  })
  content!: string;

  @Column({
    name: 'material',
    nullable: false,
  })
  material!: string; // 준비물

  @Column({
    name: 'start_date',
    nullable: false,
  })
  startDate!: Date;

  @Column({
    name: 'end_date',
    nullable: false,
  })
  endDate!: Date;

  @Column({
    name: 'picture',
    nullable: false,
  })
  picture!: string;

  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
  })
  createdAt!: Date;

  @RelationId((lecture: Lecture) => lecture.user)
  uniqueId!: string;

  @JoinColumn({ name: 'fk_unique_id' })
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user!: User;

  @RelationId((lecture: Lecture) => lecture.place)
  placeIdx!: number;

  @JoinColumn({ name: 'fk_place_idx' })
  @ManyToOne(() => Place, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  place!: Place;

  @OneToMany(() => Application, (application) => application.lecture)
  application!: Application[];

  @OneToMany(() => Tags, (tags) => tags.lecture)
  tags!: Tags[];
}
