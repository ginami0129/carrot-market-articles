import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { cloneDeep } from 'lodash';

export class PaginationParams {
  @IsOptional()
  @Default(5)
  pageSize?: number;
  @IsOptional()
  @Default(1)
  page?: number;
}

export function Default(defaultValue: unknown): PropertyDecorator {
  return Transform((value: unknown) => value ?? cloneDeep(defaultValue));
}
