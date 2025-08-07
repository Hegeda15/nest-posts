import { ForbiddenException, Injectable } from '@nestjs/common';
import { db } from 'db';
import { userTable } from 'db/schema';
import { SignInDto, SignUpDto } from './dto';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
  ) { }
  private readonly salt = 10;

  async signUp(user: SignUpDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const hashPsw = await bcrypt.hash(user.password, this.salt);
    const existing = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, user.email));

    if (existing.length > 0) {
      throw new ForbiddenException('Email already in use');
    }
    try {
      const newUser = await db
        .insert(userTable)
        .values({
          name: user.name,
          email: user.email,
          password: hashPsw,
        })
        .$returningId();

      if (!newUser || newUser.length === 0) {
        throw new Error('User insertion failed');
      }

      const insertedUser = newUser[0]; // { id: number }
      return this.createToken(insertedUser.id, user.email);
    } catch (error) {
      if (
        error instanceof Error &&
        'errno' in error &&
        (error as any).errno === 1062 // MySQL unique violation error code
      ) {
        throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }
  async signIn(user: SignInDto) {
    const [userQuery] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, user.email));

    if (!userQuery) {
      throw new ForbiddenException('nem megfellő email vagy jelszó');
    }

    const isValidPsw = await bcrypt.compare(user.password, userQuery.password);

    if (!isValidPsw) {
      throw new ForbiddenException('Hibás jelszó!');
    }

    return this.createToken(userQuery.id, userQuery.email);
  }

 
  async createToken(
    id: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const data = { sub: id, email };

    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(data, {
      expiresIn: '24h',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }
}
