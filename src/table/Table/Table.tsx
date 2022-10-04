import {FC} from 'react';
import {TableData} from '../../types';
import styles from './Table.module.scss';
import {TableBody} from './TableBody';
import {TableHead, TableSort} from './TableHead';

export interface TableProps {
  data: TableData;
  sort: TableSort | null;
  onSortChange: (sort: TableSort | null) => void;
}

export const Table: FC<TableProps> = ({data, sort, onSortChange}) => {
  return (
    <div className={styles.table}>
      <TableHead sort={sort} onSortChange={onSortChange} />
      <TableBody data={data} />
    </div>
  );
};
