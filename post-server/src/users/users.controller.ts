import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getUSers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Req() req:Request){
    return req.user
  }
 
}
