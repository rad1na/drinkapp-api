import { IsArray, IsInt, IsNotEmpty, IsString, Length, Max, MaxLength, Min } from "class-validator";

export class UserProfileDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  username: string;

  @IsNotEmpty()
  @IsInt()
  @Min(18)
  @Max(100)
  age: number;

  @IsString()
  @MaxLength(100)
  aboutMe: string;

  @IsString()
  @Length(1, 10)
  //Maybe implement custom pipe for "Male", "Female", "Other"
  @IsNotEmpty()
  sex: string;

  @IsArray()
  favouriteDrinks?: number[];
}
