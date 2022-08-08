import { PrismaService } from './../prisma/prisma.service';
import { Delete, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor (private prisma: PrismaService) {}
  async aboutMe(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      }
    })
    if(user===null){
      return new NotFoundException("User not found")
    }

    delete user.password
    return user
  }
}
