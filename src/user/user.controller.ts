import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
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

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllUser() {
    return this.userService.getAllUser()
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  deleteUser(@Param('id') id) {
    return this.userService.deleteUser(id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  updateUser(@Param('id') id, @Body() data: UserDTO ) {
    return this.userService.updateUser(id, data)
  }
}
