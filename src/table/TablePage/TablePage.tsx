import {FC, useEffect, useState} from 'react';
import {fetchData} from '../../api/fetch-data';
import {Pagination} from '../../components/Pagination/Pagination';
import {TableData} from '../../types';
import {Table} from '../Table/Table';
import {TableFilters} from '../TableFilters/TableFilters';
import styles from './TablePage.module.scss';

export const TablePage: FC = () => {
  const [data, setData] = useState<TableData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  if (!data) return <span>"Loading..."</span>;
  return (
    <div className={styles.tablePage}>
      <div className={styles.titleBar}>
        <TableFilters onCommit={console.log} />
        <Pagination
          currentPage={currentPage}
          totalPages={20}
          onPageChange={setCurrentPage}
        />
      </div>

      <Table data={data} />
    </div>
  );
};
