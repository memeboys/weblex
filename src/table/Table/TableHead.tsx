import classNames from 'classnames';
import {FC, useState} from 'react';
import {ArrowIcon} from '../../components/ArrowIcon/ArrowIcon';
import styles from './Table.module.scss';

export const TableHead: FC = () => (
  <div className={styles.head}>
    <div className={styles.row}>
      <div className={styles.cell}>Дата</div>
      <SortableHeadCell>Название</SortableHeadCell>
      <SortableHeadCell>Количество</SortableHeadCell>
      <SortableHeadCell>Расстояние</SortableHeadCell>
    </div>
  </div>
);

interface SortableHeadCellProps {
  children: string;
}

const SortableHeadCell: FC<SortableHeadCellProps> = ({children}) => {
  const [isAscending, setIsAscending] = useState(true);
  const toggleOrder = () => {
    setIsAscending(!isAscending);
  };

  return (
    <button
      className={classNames(styles.cell, styles.sortCell)}
      onClick={toggleOrder}
    >
      <ArrowIcon direction={isAscending ? 'up' : 'down'} />
      <span>{children}</span>
    </button>
  );
};
