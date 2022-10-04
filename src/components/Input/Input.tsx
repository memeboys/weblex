import {FC} from 'react';
import styles from './Input.module.scss';
export interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const Input: FC<InputProps> = ({value, onChange, label}) => (
  <label className={styles.field}>
    <span> {label}</span>
    <input type="text" value={value} onChange={e => onChange(e.target.value)} />
  </label>
);
