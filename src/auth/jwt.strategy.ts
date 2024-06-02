import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import config from "../config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(/* @Inject() configService: ConfigType<typeof config> */) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'ultraSecret1234'/* configService.jwtSecret */,
        });
    }

    async validate(payload: any) {
        return { username: payload.username, id: payload.id, mail: payload.email };
    }
}
