import { Controller, Post, Body, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() dto: SignInDto){
    return this.authService.signIn(dto)
   
  }
}
