import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HelloModule } from 'src/hello/hello.module';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';

@Module({
    imports: [
        HelloModule,
        JwtModule.register({
            global: true,
            //secret: jwtConstants.secret,
            secret: 'secret',
            signOptions: { expiresIn: '10h' },
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }
