import {FC} from 'react';
import styles from './Pagination.module.scss';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (currentPage: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  totalPages = Math.max(0, Math.trunc(totalPages)) || 1;
  currentPage = Math.max(0, Math.trunc(currentPage)) || 1;
  currentPage = Math.min(currentPage, totalPages);
  return (
    <div className={styles.pagination}>
      <button
        type="button"
        disabled={currentPage === 1}
        className={styles.prevPage}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
      <div className={styles.currentPage}>
        <span>{currentPage}/</span>
        <span>{totalPages}</span>
      </div>
      <button
        type="button"
        className={styles.nextPage}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};
