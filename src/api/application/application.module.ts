import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationService } from './application.service';
import { ApplicationRepository } from './repository/application.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationRepository])],
  providers: [ApplicationService],
  exports: [ApplicationService],
})
export class ApplicationModule {}
