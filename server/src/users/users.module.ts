import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: process.env.JWT_SECRET || 'defaultSecret',
    signOptions: { expiresIn: '1h' },
  }),
],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
