import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  login(username: string, password: string): string {
    console.log(`${username} signed up with password ${password}`);
    return `${username} signed up with password ${password}`;
  }

  signup(username: string, password: string): string {
    console.log(`${username} signed up with password ${password}`);
    return `${username} signed up with password ${password}`;
  }
}
