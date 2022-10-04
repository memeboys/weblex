import {FC, useState} from 'react';
import {TableData} from '../../types';
import {Pagination} from '../Pagination/Pagination';
import styles from './Table.module.scss';
import {TableBody} from './TableBody';
import {TableFilters} from './TableFilters';
import {TableHead} from './TableHead';

export type ColumnKind = 'name' | 'quantity' | 'distance';
export type OperationKind = 'equals' | 'contains' | 'lessThan' | 'greaterThan';

export interface TableFiltersValue {
  column: ColumnKind;
  operation: OperationKind;
  value: string;
}

export interface TableProps {
  data: TableData;
}

export const Table: FC<TableProps> = ({data}) => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className={styles.table}>
      <TableFilters onCommit={console.log} />
      <TableHead />
      <TableBody data={data} />
      <Pagination
        currentPage={currentPage}
        totalPages={20}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
