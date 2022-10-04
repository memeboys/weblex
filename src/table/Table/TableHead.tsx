import classNames from 'classnames';
import {FC} from 'react';
import {ArrowIcon} from '../../components/ArrowIcon/ArrowIcon';
import {Column, Order} from '../../types/common';
import styles from './Table.module.scss';

export interface TableSort {
  readonly column: Column;
  readonly order: Order;
}

export interface TableHeadProps {
  sort: TableSort | null;
  onSortChange: (sort: TableSort | null) => void;
}

export const TableHead: FC<TableHeadProps> = ({sort, onSortChange}) => {
  const toggleSort = (column: Column) => {
    if (sort?.column !== column) {
      onSortChange({column, order: 'ascending'});
      return;
    }
    switch (sort?.order) {
      case 'ascending':
        onSortChange({column, order: 'descending'});
        break;
      case 'descending':
        onSortChange(null);
        break;
      default:
        onSortChange({column, order: 'ascending'});
    }
  };

  return (
    <div className={styles.head}>
      <div className={styles.row}>
        <div className={styles.cell}>Дата</div>
        <SortableHeadCell
          order={sort?.column === 'name' ? sort.order : null}
          onToggle={() => toggleSort('name')}
        >
          Название
        </SortableHeadCell>
        <SortableHeadCell
          order={sort?.column === 'quantity' ? sort.order : null}
          onToggle={() => toggleSort('quantity')}
        >
          Количество
        </SortableHeadCell>
        <SortableHeadCell
          order={sort?.column === 'distance' ? sort.order : null}
          onToggle={() => toggleSort('distance')}
        >
          Расстояние
        </SortableHeadCell>
      </div>
    </div>
  );
};

interface SortableHeadCellProps {
  order: Order | null;
  children: string;
  onToggle: () => void;
}

const SortableHeadCell: FC<SortableHeadCellProps> = ({
  order,
  children,
  onToggle,
}) => (
  <button
    className={classNames(styles.cell, styles.sortCell)}
    onClick={onToggle}
  >
    <span>{children}</span>
    <OrderIcon order={order} />
  </button>
);
interface OrderIconProps {
  order: Order | null;
}

const OrderIcon: FC<OrderIconProps> = ({order}) => {
  if (!order) return null;
  return <ArrowIcon direction={order === 'ascending' ? 'up' : 'down'} />;
};
