import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class loginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}