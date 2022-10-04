import {FC} from 'react';
import {TableData, TableItem} from '../../types';
import styles from './Table.module.scss';

interface TableBodyProps {
  data: TableData;
}

export const TableBody: FC<TableBodyProps> = ({data}) => {
  return (
    <div className={styles.body}>
      {data.map(item => (
        <TableRow row={item} key={item.id} />
      ))}
    </div>
  );
};

interface TableRowProps {
  row: TableItem;
}

const TableRow: FC<TableRowProps> = ({row}) => {
  const date = new Date(row.date).toLocaleDateString();
  return (
    <div className={styles.row} key={row.id}>
      <div className={styles.cell}>{date}</div>
      <div className={styles.cell}>{row.name}</div>
      <div className={styles.cell}>{row.quantity}</div>
      <div className={styles.cell}>{row.distance}</div>
    </div>
  );
};
