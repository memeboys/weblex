import source from '../assets/data.json';

export function filterData(
  data: typeof source,
  filterBy: string,
  filterOp: string,
  filterValue: string
): typeof source {
  filterValue = filterValue.trim();
  data = data.slice();
  switch (filterBy) {
    case 'name':
      switch (filterOp) {
        case 'equals':
          return data.filter(x => x.name === filterValue);
        case 'contains': {
          const value = filterValue.toLowerCase().replaceAll(/\s+/g, '');
          return data.filter(x =>
            x.name.toLowerCase().replaceAll(/\s+/g, '').includes(value)
          );
        }
        case 'lessThan':
          return data.filter(x => x.name.localeCompare(filterValue) < 0);
        case 'greaterThan':
          return data.filter(x => x.name.localeCompare(filterValue) > 0);
      }
      break;
    case 'distance':
      switch (filterOp) {
        case 'equals': {
          const value = Number(filterValue);
          return data.filter(x => x.distance === value);
        }
        case 'contains': {
          return data.filter(x => String(x.distance).includes(filterValue));
        }
        case 'lessThan': {
          const value = Number(filterValue);
          return data.filter(x => x.distance < value);
        }
        case 'greaterThan': {
          const value = Number(filterValue);
          return data.filter(x => x.distance > value);
        }
      }
      break;
    case 'quantity':
      switch (filterOp) {
        case 'equals': {
          const value = Number(filterValue);
          return data.filter(x => x.quantity === value);
        }
        case 'contains': {
          return data.filter(x => String(x.quantity).includes(filterValue));
        }
        case 'lessThan': {
          const value = Number(filterValue);
          return data.filter(x => x.quantity < value);
        }
        case 'greaterThan': {
          const value = Number(filterValue);
          return data.filter(x => x.quantity > value);
        }
      }
      break;
  }
  return data;
}
