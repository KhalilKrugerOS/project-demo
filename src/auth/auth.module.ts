import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from 'src/constants/constants';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

//import JwtModule from '@nestjs/jwt';
@Module({
    imports: [
        TypeOrmModule.forFeature([UsersService]),
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [],
})
export class AuthModule { }