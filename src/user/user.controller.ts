import { UserService } from './user.service';
import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor( private userService : UserService ){}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  aboutMe(@Req() req: Request) {
    return req.user
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  getUserByID(@Param('id') id) {
    return this.userService.getUserByID(id)
  }
}
