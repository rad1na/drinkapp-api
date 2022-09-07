import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import SmsService from "../sms/sms.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PhoneNumberDTO } from "../user/dto/phone-number.dto";
import { VerifyUserPhoneNumberDto } from "../user/dto/verify-phone-user.dto";
import { User } from ".prisma/client";

@Injectable()
export class AuthService {
  constructor(private ps: PrismaService, private ss: SmsService, private js: JwtService, private cs: ConfigService) {}

  async initAuth(phoneNumberData: PhoneNumberDTO) {
    const { phoneNumber } = phoneNumberData;
    const findUser: User = await this.ps.user.findUnique({
      where: {
        phoneNumber,
      },
    });
    if (!findUser) {
      try {
        await this.ps.user.create({
          data: {
            phoneNumber,
            role: 1, // basic_user role
          },
          select: { phoneNumber: true, id: true },
        });
      } catch (error) {
        return { error };
      }
    }
    await this.ss.initiatePhoneNumberVerification(phoneNumber);
    return {
      phoneNumber: phoneNumber,
      message: "Please verify phone number",
    };
  }

  async verify(verifyUser: VerifyUserPhoneNumberDto) {
    const { phoneNumber, code } = verifyUser;
    const verificationResult = await this.ss.confirmPhoneNumber(phoneNumber, code);
    if (!verificationResult.valid || verificationResult.status !== "approved") {
      throw new BadRequestException("Wrong code provided");
    } else {
      try {
        const user = await this.ps.user.update({
          where: {
            phoneNumber: phoneNumber,
          },
          data: {
            isPhoneNumberConfirmed: true,
          },
        });
        const token = await this.signToken(user.id, phoneNumber);
        return { message: "Successfully verified phone number", token };
      } catch (error) {
        return { error };
      }
    }
  }

  async signToken(userId: string, phoneNumber: string): Promise<{ token: string }> {
    const payload = {
      sub: userId,
      phoneNumber,
    };
    const token = await this.js.signAsync(payload, { expiresIn: "1 days", secret: this.cs.get("JWT_SECRET") });
    return { token: token };
  }
}
