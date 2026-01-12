import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'titl1',
    minimum: 1,
    maximum: 60,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 60)
  title: string;

  @ApiProperty({
    example:"content 1",
     minimum: 1,
    maximum: 60,
  })
  
  @IsNotEmpty()
  @IsString()
  @Length(1, 600)
  content: string;
}
