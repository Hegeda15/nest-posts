import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsEmail({}, { message: 'Érvénytelen email cím' })
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
}

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
