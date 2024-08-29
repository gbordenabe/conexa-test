import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/schemas';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { envs } from 'src/config';
import { UserService } from 'src/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      secretOrKey: envs.jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;

    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new UnauthorizedException('Token is not valid');
    }
    if (!user.isActive) {
      throw new UnauthorizedException('User is not active');
    }

    return user;
  }
}
