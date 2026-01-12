import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example:"giorgi@gmail.com"
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example:"Password123"
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;
}
