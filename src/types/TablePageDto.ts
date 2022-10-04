import {TableItemDto} from './TableItemDto';

export interface TablePageDto {
  readonly totalPages: number;
  readonly items: readonly TableItemDto[];
}
