import { PartialType } from "@nestjs/mapped-types";
import { PhoneNumberDTO } from "./phone-number.dto";

export class UpdateUserDto extends PartialType(PhoneNumberDTO) {}
