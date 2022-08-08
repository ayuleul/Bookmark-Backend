import { LoginDto, SignupDto } from './dto/auth.dto';
import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, 
    private jwt : JwtService,
    private config : ConfigService
    ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where:{
        email: dto.email,
      }
    })
    if(!user){
      throw new ForbiddenException('Invalid credentials');
    }

    const passwordMatch = await argon.verify( user.password, dto.password);

    if(!passwordMatch){
      throw new ForbiddenException('Invalid credentials');
    }

    delete user.password
    const token = await this.signToken(user);
    return {
      ...user,
      ...token
    }
  }

  async signup(dto: SignupDto) {
    const hashedPassword = await argon.hash(dto.password);
    try{
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashedPassword,
        }
      });
      delete user.password;
      return {
        token : this.signToken(user),
        ...user
      };
    }
    catch(err){
      if(err instanceof PrismaClientKnownRequestError){
        if(err.code === 'P2002'){
          throw new ForbiddenException('Email already in use');
        }
      }
      throw err;
    }
  }

  async signToken(user: any){
    const payload = {
      userId: user.id,
      email: user.email,
      name: user.name,
    }
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.sign(payload, {secret});
    return {
      access_token: token,
    }
  }
}
