import classNames from "classnames";
import { FC, useMemo, useState } from 'react';
import { TableData, TableItem } from '../../types';
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { ArrowIcon } from "../SortIcon/ArrowIcon";
import styles from "./Table.module.scss";

interface TableRowProps {
  row: TableItem;
}

const TableRow: FC<TableRowProps> = ({ row }) => {
  const date = useMemo(() => new Date(row.date).toLocaleDateString(), [row.date])
  return (
    <div className={styles.row} key={row.id}>
      <div className={styles.cell}>{date}</div>
      <div className={styles.cell}>{row.name}</div>
      <div className={styles.cell}>{row.quantity}</div>
      <div className={styles.cell}>{row.distance}</div>
    </div>
  )
}

const TableHead: FC = () => (
  <div className={styles.head}>
    <div className={styles.row}>
      <div className={styles.cell}>Дата</div>
      <SortableHeadCell>Название</SortableHeadCell>
      <SortableHeadCell>Количество</SortableHeadCell>
      <SortableHeadCell>Расстояние</SortableHeadCell>
    </div>
  </div>
)

interface SortableHeadCellProps {
  children: string;
}

const SortableHeadCell: FC<SortableHeadCellProps> = ({ children }) => {
  const [isAscending, setIsAscending] = useState(true);
  const toggleOrder = () => {
    setIsAscending(!isAscending);
  }

  return (
    <button className={classNames(styles.cell, styles.sortCell)} onClick={toggleOrder}>
      <ArrowIcon direction={isAscending ? "up" : "down"} />
      <span>{children}</span>
    </button>
  )
}

interface TableBodyProps {
  data: TableData;
}

const TableBody: FC<TableBodyProps> = ({ data }) => {
  return (
    <div className={styles.body}>
      {data.map((item) => <TableRow row={item} key={item.id} />)}
    </div>
  )
}

export interface TableProps {
  data: TableData;
}

export const Table: FC<TableProps> = ({ data }) => {
  return (
    <div className={styles.table}>
      <TableFilters />
      <TableHead />
      <TableBody data={data} />
    </div>
  );
}

type ColumnKind = "name" | "quantity" | "distance";
type OperationKind = "equals" | "contains" | "lessThan" | "greaterThan";

interface TableFiltersValue {
  column: ColumnKind | null;
  operation: OperationKind | null;
  value: string;
}

const TableFilters: FC = () => {
  const [value, setValue] = useState<TableFiltersValue>({
    column: null,
    operation: null,
    value: ""
  });
  return (
    <div className={styles.filters}>
      {/* <select value={value.column ?? undefined} onChange={(e) => setValue({ ...value, column: e.target.value as ColumnKind })}>
        <option disabled selected value=""></option>
        <option value="name">Название</option>
        <option value="quantity">Количество</option>
        <option value="distance">Расстояние</option>
      </select>
      <select value={value.operation ?? undefined} onChange={(e) => setValue({ ...value, operation: e.target.value as OperationKind })}>
        <option disabled selected value=""></option>
        <option value="equals">Равно</option>
        <option value="contains">Содержит</option>
        <option value="lessThan">Меньше чем</option>
        <option value="greaterThan">Больше чем</option>
      </select>
      <input type="text" value={value.value} onChange={(e) => setValue({ ...value, value: e.target.value })} /> */}
      <Select label="Колонка" options={[
        { value: "name", label: "Название" },
        { value: "quantity", label: "Количество" },
        { value: "distance", label: "Расстояние" },
      ]} />
      <Select label="Операция" options={[
        { value: "equals", label: "Равно" },
        { value: "contains", label: "Содержит" },
        { value: "lessThan", label: "Меньше чем" },
        { value: "greaterThan", label: "Больше чем" },
      ]} />
      <Input label="Значение" value={value.value} onChange={x => setValue({ ...value, value: x })} />
    </div>
  )
}
