import {FC, useEffect, useState} from 'react';
import {fetchData} from '../../api/fetchData';
import {Pagination} from '../../components/Pagination/Pagination';
import {TablePageDto} from '../../types/TablePageDto';
import {Table} from '../Table/Table';
import {TableSort} from '../Table/TableHead';
import {TableFilters, TableFiltersValue} from '../TableFilters/TableFilters';
import styles from './TablePage.module.scss';

export const TablePage: FC = () => {
  const [data, setData] = useState<TablePageDto | null>(null);
  const [filter, setFilter] = useState<TableFiltersValue | null>(null);
  const [sort, setSort] = useState<TableSort | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData({
      page,
      pageSize: 20,
      sort,
      filter,
    }).then(setData);
  }, [filter, page, sort]);

  const handleSortChange = (sort: TableSort | null) => {
    setSort(sort);
    setPage(1);
  };

  if (!data) return <span>Loading...</span>;
  return (
    <div className={styles.tablePage}>
      <div className={styles.titleBar}>
        <TableFilters onCommit={setFilter} />
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      </div>

      <Table data={data.items} sort={sort} onSortChange={handleSortChange} />
    </div>
  );
};
