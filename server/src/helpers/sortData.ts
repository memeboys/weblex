import source from '../assets/data.json';

export function sortData(
  data: typeof source,
  sortBy: string,
  order: string
): typeof source {
  data = data.slice();
  if (order !== 'ascending' && order !== 'descending') return data;
  const sign = order === 'ascending' ? 1 : -1;
  switch (sortBy) {
    case 'name':
      data.sort((a, b) => a.name.localeCompare(b.name) * sign);
      break;
    case 'distance':
      data.sort((a, b) => (a.distance - b.distance) * sign);
      break;
    case 'quantity':
      data.sort((a, b) => (a.quantity - b.quantity) * sign);
      break;
  }
  return data;
}
