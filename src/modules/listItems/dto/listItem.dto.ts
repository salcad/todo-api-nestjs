import { IsNotEmpty, MinLength } from 'class-validator';

export class ListItemDto {
  @IsNotEmpty()
  @MinLength(1)
  readonly content: string;

  readonly complete: boolean;
}
