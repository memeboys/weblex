import {Handler} from '@netlify/functions';
import source from '../assets/data.json';
import {filterData} from '../helpers/filterData';
import {sortData} from '../helpers/sortData';

export const handler: Handler = async (event, context) => {
  const {queryStringParameters: params} = event;
  if (!params) return {statusCode: 400};
  const page = Number(params['page']);
  const pageSize = Number(params['pageSize']);
  const {sortBy, order, filterBy, filterOp, filterValue} = params;
  if (!Number.isInteger(page) || page <= 0) {
    return {statusCode: 400, body: 'Invalid page parameter!'};
  }
  if (!Number.isInteger(pageSize) || pageSize <= 0) {
    return {statusCode: 400, body: 'Invalid pageSize parameter!'};
  }
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  let data = source;
  if (typeof sortBy === 'string' && typeof order === 'string') {
    data = sortData(data, sortBy, order);
  }
  if (
    typeof filterBy === 'string' &&
    typeof filterOp === 'string' &&
    typeof filterValue === 'string'
  ) {
    data = filterData(data, filterBy, filterOp, filterValue);
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      totalPages: Math.ceil(data.length / pageSize),
      items: data.slice(startIndex, endIndex),
    }),
  };
};
