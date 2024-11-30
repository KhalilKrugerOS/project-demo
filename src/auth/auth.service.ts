import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async signUp(name: string, password: string) {
        const user = await this.userService.findByName(name);
        if (user) {
            throw new UnauthorizedException();
        }
        return this.userService.create({ name: name, password: password });
    }
    async singIn(username: string, password: any): Promise<{ access_token: string }> {
        const user = await this.userService.findByName(username);
        if (user?.password !== password) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, pass: user.password };
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
