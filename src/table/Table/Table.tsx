import {FC} from 'react';
import {TableData} from '../../types';
import styles from './Table.module.scss';
import {TableBody} from './TableBody';
import {TableHead} from './TableHead';

export interface TableProps {
  data: TableData;
}

export const Table: FC<TableProps> = ({data}) => {
  return (
    <div className={styles.table}>
      <TableHead />
      <TableBody data={data} />
    </div>
  );
};
