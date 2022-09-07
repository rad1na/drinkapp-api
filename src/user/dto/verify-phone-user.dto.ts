import { IsNotEmpty, IsPhoneNumber, IsString, Length } from "class-validator";

export class VerifyUserPhoneNumberDto {
  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;
  @IsNotEmpty()
  @IsString()
  @Length(6)
  code: string;
}
