import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { CaslModule } from "../casl/casl.module";
import { SmsModule } from "../sms/sms.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { PoliciesGuard } from "./guards/policy.guard";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [JwtModule.register({}), SmsModule, CaslModule],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, PoliciesGuard],
  controllers: [AuthController],
})
export class AuthModule {}
