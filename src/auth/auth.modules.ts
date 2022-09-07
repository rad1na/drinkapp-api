import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SmsModule } from "../sms/sms.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [JwtModule.register({}), SmsModule],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
