import {Column, Operation, Order} from '../types/common';
import {TablePageDto} from '../types/TablePageDto';

export interface FetchDataRequest {
  readonly page: number;
  readonly pageSize: number;
  readonly sort: SortQuery | null;
  readonly filter: FilterQuery | null;
}

export interface SortQuery {
  readonly column: Column;
  readonly order: Order;
}

export interface FilterQuery {
  readonly column: Column;
  readonly operation: Operation;
  readonly value: string;
}

export function fetchData(request: FetchDataRequest): Promise<TablePageDto> {
  return fetch(`/api/data?${buildParams(request)}`).then(response =>
    response.json()
  );
}

function buildParams(request: FetchDataRequest): URLSearchParams {
  const params = new URLSearchParams();
  params.append('page', String(request.page));
  params.append('pageSize', String(request.pageSize));
  if (request.sort) {
    params.append('sortBy', request.sort.column);
    params.append('order', request.sort.order);
  }
  if (request.filter) {
    params.append('filterBy', request.filter.column);
    params.append('filterOp', request.filter.operation);
    params.append('filterValue', request.filter.value);
  }
  return params;
}
