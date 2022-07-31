import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
  imports: [UserModule, JwtModule.registerAsync({useFactory: () =>({
    secret: "secret",
    signOptions: {expiresIn: '1h'}
  })})],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy, JwtGuard]
})
export class AuthModule {}
