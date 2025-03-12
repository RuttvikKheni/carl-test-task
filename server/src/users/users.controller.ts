import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { SignupDto, loginDto } from './dto/auth.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.usersService.signup(signupDto);
  }

  @Post('login')
  login(@Body() loginDto: loginDto, @Res() res: Response) {
    this.usersService.login(loginDto, res);
  }
}
