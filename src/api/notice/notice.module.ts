import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeRepository } from './repository/notice.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NoticeRepository])],
  providers: [NoticeService],
  controllers: [NoticeController],
})
export class NoticeModule {}
