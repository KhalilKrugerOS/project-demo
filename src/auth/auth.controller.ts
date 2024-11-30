import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, RequestMapping, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/auth.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() signUpDto: CreateUserDto) {
        return this.authService.signUp(signUpDto.name, signUpDto.password);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.singIn(signInDto.username, signInDto.password);
    }
}
