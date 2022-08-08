import { IsEmail, IsOptional, IsString } from "class-validator";

export class UserDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}