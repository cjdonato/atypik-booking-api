import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { AccommodationController } from './accommodation.controller';
import { Accommodation } from './accommodation.entity';
import { AccommodationService } from './accommodation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Accommodation, User])],
  controllers: [AccommodationController],
  providers: [AccommodationService],
})
export class AccommodationModule {}
