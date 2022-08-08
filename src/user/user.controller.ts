import { UserService } from './user.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor( private userService : UserService ){}

  @UseGuards(AuthGuard('jwt'))
  @Get('me/:id')
  aboutMe(@Param('id') id) {
    return this.userService.aboutMe(id)
  }
}
