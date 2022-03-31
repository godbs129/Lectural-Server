import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Lecture } from './lecture.entity';

@Entity('place')
export class Place {
  @PrimaryGeneratedColumn({
    name: 'idx',
  })
  idx!: number;

  @Column({
    name: 'name',
    nullable: false,
  })
  name!: string;

  @Column({
    name: 'type',
    nullable: false,
  })
  type!: number;

  @OneToMany(() => Lecture, (lecture) => lecture.place)
  place!: Place[];
}
