import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Twilio } from "twilio";

@Injectable()
export default class SmsService {
  public tc: Twilio;

  constructor(private readonly cs: ConfigService) {
    const accountSid = cs.get("TWILIO_ACCOUNT_SID");
    const authToken = cs.get("TWILIO_AUTH_TOKEN");

    this.tc = new Twilio(accountSid, authToken);
  }
  async initiatePhoneNumberVerification(phoneNumber: string) {
    const serviceSid = this.cs.get("TWILIO_VERIFICATION_SERVICE_SID");
    return this.tc.verify.services(serviceSid).verifications.create({ to: phoneNumber, channel: "sms" });
  }

  async confirmPhoneNumber(phoneNumber: string, verificationCode: string) {
    const serviceSid = this.cs.get("TWILIO_VERIFICATION_SERVICE_SID");
    return await this.tc.verify
      .services(serviceSid)
      .verificationChecks.create({ to: phoneNumber, code: verificationCode });
  }
}
