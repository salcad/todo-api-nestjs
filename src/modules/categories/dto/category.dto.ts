import { IsNotEmpty, MinLength } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  @MinLength(1)
  readonly title: string;
}
