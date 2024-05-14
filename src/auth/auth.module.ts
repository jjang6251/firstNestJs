import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HelloModule } from 'src/hello/hello.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        HelloModule,
        JwtModule.register({
            global: true,
            //secret: jwtConstants.secret,
            secret: 'secrete',
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }
