import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class PhoneNumberDTO {
  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;
}
