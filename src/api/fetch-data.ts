import {TableData} from '../types';

const ENDPOINT = process.env['REACT_APP_ENDPOINT'];

export function fetchData(): Promise<TableData> {
  return fetch(`${ENDPOINT}/data`).then(response => response.json());
}
