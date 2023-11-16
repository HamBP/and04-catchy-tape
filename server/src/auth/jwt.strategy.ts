import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/entity/user.entity';
import { HTTP_STATUS_CODE } from 'src/httpStatusCode.enum';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload): Promise<User> {
    const { userId } = payload;

    const user: User = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      throw new HttpException(
        'Not Exist User',
        HTTP_STATUS_CODE['WRONG TOKEN'],
      );
    }

    return user;
  }
}
