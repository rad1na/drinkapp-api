import { Controller, Post, Body } from "@nestjs/common";
import { PhoneNumberDTO } from "../user/dto/phone-number.dto";
import { VerifyUserPhoneNumberDto } from "../user/dto/verify-phone-user.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly as: AuthService) {}

  @Post("init")
  initAuth(@Body() phoneNumber: PhoneNumberDTO) {
    return this.as.initAuth(phoneNumber);
  }

  @Post("verify")
  verifyUser(@Body() verifyUser: VerifyUserPhoneNumberDto) {
    return this.as.verify(verifyUser);
  }
}
