import { IsNotEmpty, IsString, Length } from "class-validator";

export class DrinkTypeDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  type: string;
}
