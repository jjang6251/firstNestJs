import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Login } from '../dto/login.dto';
import { AuthGuard } from '../guard/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() loginDto: Login) {
        return this.authService.signIn(loginDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
