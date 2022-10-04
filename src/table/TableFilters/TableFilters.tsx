import {FC, useCallback, useState} from 'react';
import {Input} from '../../components/Input/Input';
import {Select} from '../../components/Select/Select';
import {Column, Operation} from '../../types/common';
import {debounce} from '../../utils/debounce';
import styles from './TableFilters.module.scss';

export interface TableFiltersValue {
  column: Column;
  operation: Operation;
  value: string;
}

export interface TableFiltersProps {
  onCommit: (filters: TableFiltersValue) => void;
}

interface NullableTableFiltersValue {
  column: Column | null;
  operation: Operation | null;
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceCommitIfNeeded = useCallback(debounce(600, commitIfNeeded), []);

  return (
    <div className={styles.filters}>
      <Select<Column>
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
      <Select<Operation>
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
        onReturn={value => {
          const nextFilters: NullableTableFiltersValue = {...filters, value};
          setFilters(nextFilters);
          commitIfNeeded(nextFilters);
        }}
        onChange={value => {
          const nextFilters: NullableTableFiltersValue = {...filters, value};
          setFilters(nextFilters);
          debounceCommitIfNeeded(nextFilters);
        }}
      />
    </div>
  );
};
