import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(/* @Inject() configService: ConfigType<typeof config> */) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'ultraSecret1234' /* configService.jwtSecret */,
    });
  }

  async validate(payload: any) {
    return { id: payload.id, mail: payload.email };
  }
}
