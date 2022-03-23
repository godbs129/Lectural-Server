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

  @OneToMany(() => Lecture, (lecture) => lecture.place)
  place!: Place[];
}
