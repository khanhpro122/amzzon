import { UserService } from './../user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { createUser } from './dto/dto.create-user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private JwtService: JwtService){}

    hashPassWord(password: string): Promise<string> {
        return bcrypt.hash(password, 10)
    }

    async register(user :createUser) {
        const {name,email,password} = user
        const existUser = await this.userService.findByEmail(email)
        if(existUser) {
            return 'Email is exist'
        }
        const hassPassword = await this.hashPassWord(password)
        const newUser = await this.userService.create(name,email,hassPassword)
        return await this.userService.getDetails(newUser)
    }

    async doesMatchPassword(password:string, hashPassword:string) {
        return await bcrypt.compare(password, hashPassword)
    }

    async validate(email:string,password:string) {
        let existEmail = await this.userService.findByEmail(email)
        if(!existEmail) return null;
        let compare = await this.doesMatchPassword(password, existEmail.password)
        if(!compare) return null
        let user = await this.userService.getDetails(existEmail)
        return user
    }

    async login(user: createUser) {
        const { email, password} = user
        let check = await this.validate(email, password)
        if(!check) return null
        const token = await this.JwtService.signAsync(check)
        return {token}
    }
    
    async verify(jwt:string) {
        try{
            let { exp } = await this.JwtService.verifyAsync(jwt)
            console.log('expt', exp)
            return { exp }
        }catch(err) {
            throw new HttpException('Invalid jwt', HttpStatus.UNAUTHORIZED)
        }
    }
}
