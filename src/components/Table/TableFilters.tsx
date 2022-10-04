import {FC, useCallback, useState} from 'react';
import {debounce} from '../../utils/debounce';
import {Input} from '../Input/Input';
import {Select} from '../Select/Select';
import {ColumnKind, OperationKind, TableFiltersValue} from './Table';
import styles from './Table.module.scss';

export interface TableFiltersProps {
  onCommit: (filters: TableFiltersValue) => void;
}

interface NullableTableFiltersValue {
  column: ColumnKind | null;
  operation: OperationKind | null;
  value: string;
}

export const TableFilters: FC<TableFiltersProps> = ({onCommit}) => {
  const [filters, setFilters] = useState<NullableTableFiltersValue>({
    column: null,
    operation: null,
    value: '',
  });

  const commitIfNeeded = (filters: NullableTableFiltersValue) => {
    let {column, operation, value} = filters;
    if (!column || !operation) return;
    value = value.trim();
    if (!value) return;
    onCommit({column, operation, value});
  };

  const debounceCommitIfNeeded = useCallback(
    debounce(1000, commitIfNeeded),
    []
  );

  return (
    <div className={styles.filters}>
      <Select<ColumnKind>
        label="Колонка"
        value={filters.column}
        onChange={column => {
          const nextFilters: NullableTableFiltersValue = {...filters, column};
          setFilters(nextFilters);
          commitIfNeeded(nextFilters);
        }}
        options={[
          {value: 'name', label: 'Название'},
          {value: 'quantity', label: 'Количество'},
          {value: 'distance', label: 'Расстояние'},
        ]}
      />
      <Select<OperationKind>
        label="Операция"
        value={filters.operation}
        onChange={operation => {
          const nextFilters: NullableTableFiltersValue = {
            ...filters,
            operation,
          };
          setFilters(nextFilters);
          commitIfNeeded(nextFilters);
        }}
        options={[
          {value: 'equals', label: 'Равно'},
          {value: 'contains', label: 'Содержит'},
          {value: 'lessThan', label: 'Меньше чем'},
          {value: 'greaterThan', label: 'Больше чем'},
        ]}
      />
      <Input
        label="Значение"
        value={filters.value}
        onChange={value => {
          const nextFilters: NullableTableFiltersValue = {...filters, value};
          setFilters(nextFilters);
          debounceCommitIfNeeded(nextFilters);
        }}
      />
    </div>
  );
};
