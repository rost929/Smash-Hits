import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './Jwt.strategy';
import { AuthService } from './services/Auth.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './controllers/Auth.controller';
import { UserModule } from '../users/User.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        return {
          secret: 'ultraSecret1234',
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
