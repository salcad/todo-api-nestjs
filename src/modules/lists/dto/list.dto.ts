import { IsNotEmpty, MinLength } from 'class-validator';

export class ListDto {
  @IsNotEmpty()
  @MinLength(1)
  readonly title: string;

  readonly pinned: boolean;
  readonly categoryId: number;
}
