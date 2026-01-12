import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    example:"giorgi giorgadze"
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    example:"giorgi@gmail.com"
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example:"Password123",
    minimum:6,
    maximum:20
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;
}
