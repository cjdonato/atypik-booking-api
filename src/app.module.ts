import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AccommodationModule } from './accommodation/accommodation.module';
import { Accommodation } from './accommodation/accommodation.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        // Always add new entitiy
        entities: [User, Accommodation],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    // Always add new module
    UserModule,
    AccommodationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
