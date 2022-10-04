import {FC} from 'react';
import styles from './ClearButton.module.scss';

export interface ClearButtonProps {
  onPress: () => void;
}

export const ClearButton: FC<ClearButtonProps> = ({onPress}) => (
  <button className={styles.button} type="button" onClick={onPress}>
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 1L1 15"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 15L1 1"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
);
