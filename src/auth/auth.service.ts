import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async singIn(username: string, password: any) {
        const user = await this.userService.findByName(username);
        if (user?.password !== password) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, pass: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
