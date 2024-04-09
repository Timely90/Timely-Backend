import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsNumber, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  rol: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;

  @IsBoolean()
  isVerified: boolean;
}

export class UpdateUserDto {
  @IsNumber()
  id?:number;
  
  @IsString()
  @MinLength(1)
  name?: string;

  @IsEmail()
  email?: string;

  @IsString()
  rol?: string;
}

