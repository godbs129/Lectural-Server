import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Application } from './application.entity';
import { Lecture } from './lecture.entity';
import { Request } from './request.entity';

@Entity('user')
export class User {
  @PrimaryColumn({
    name: 'unique_id',
    nullable: false,
  })
  uniqueId!: string;

  @Column({
    name: 'name',
    nullable: false,
  })
  name!: string;

  @Column({
    name: 'access_level',
    nullable: false,
  })
  accessLevel!: number;

  @Column({
    name: 'profile_image',
    nullable: false,
  })
  profileImage!: string;

  @OneToMany(() => Application, (application) => application.user)
  application!: Application[];

  @OneToMany(() => Lecture, (lecture) => lecture.user)
  lecture!: Lecture[];

  @OneToMany(() => Request, (request) => request.user)
  request!: Request[];
}
