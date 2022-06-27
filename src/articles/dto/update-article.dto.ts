import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title2: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  desc: string;
}
