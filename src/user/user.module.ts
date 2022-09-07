import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { SmsModule } from "../sms/sms.module";
import { CaslModule } from "../casl/casl.module";

@Module({
  imports: [SmsModule, CaslModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
