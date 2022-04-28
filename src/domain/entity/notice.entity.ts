import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('notice')
export class Notice {
  @PrimaryGeneratedColumn()
  idx!: number;

  @Column({
    name: 'title',
    nullable: false,
  })
  title: string;

  @Column({
    name: 'reason',
  })
  reason!: string;

  @Column({
    name: 'author',
  })
  author!: string;

  @Column({
    name: 'expire_date',
    nullable: false,
  })
  expireDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
