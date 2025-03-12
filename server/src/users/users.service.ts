import { Injectable, ConflictException, UnauthorizedException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { loginDto, SignupDto } from './dto/auth.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async signup(signupDto: SignupDto): Promise<{ message: string }> {
    try {
      const { email, password, username } = signupDto;

      if (!email || !password || !username) {
        throw new Error('Missing required fields');
      }

      // Check if the user already exists
      const existingUser = await this.userRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new ConflictException('User already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save user
      const user = this.userRepository.create({ email, password: hashedPassword, username });
      await this.userRepository.save(user);

      return { message: 'User registered successfully' };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async login(loginDto: loginDto, @Res() res: Response): Promise<void> {
    try {
      const { email, password } = loginDto;
  
      if (!email || !password) {
        throw new Error('Missing required fields');
      }
  
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      // Generate JWT token
      const payload = { email: user.email, id: user.id };
      const accessToken = await this.jwtService.signAsync(payload);
  
    // **Set token in an HTTP-only, Secure Cookie**
    res.cookie('token', accessToken, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',  
      path: '/',  
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
  
      res.status(200).json({ message: 'Login successful' });
  
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }
      res.status(500).json({ message: `Failed to login: ${error.message}` });
    }
  }
  
}
