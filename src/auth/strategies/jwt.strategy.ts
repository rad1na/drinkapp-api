import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../../prisma/prisma.service";
import { CaslAbilityFactory } from "../../casl/casl-ability.factory";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private cs: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: cs.get("JWT_SECRET"),
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
      });
      delete user.hash;
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
