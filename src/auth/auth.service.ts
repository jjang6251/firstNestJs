import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HelloService } from 'src/hello/hello.service';
import { Login } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private helloService: HelloService,
    private jwtService: JwtService,
  ) { }

  async signIn(loginDto:Login): Promise<{ access_token: string }> {
    const user = await this.helloService.findOne(loginDto.username);

    if (user?.password !== loginDto.password) {
      throw new UnauthorizedException();
    }
    
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
