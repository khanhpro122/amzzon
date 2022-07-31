import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUser } from './dto/dto.create-user';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Post('register')
    register(@Body() user: createUser) {
        return this.authService.register(user)
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() user: createUser) {
        return this.authService.login(user)
    }

    @HttpCode(HttpStatus.OK)
    @Post('verify')
    verify(@Body() payload: {jwt: string}) {
        return this.authService.verify(payload.jwt)
    }
}