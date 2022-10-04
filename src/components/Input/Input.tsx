import {FC} from 'react';
import styles from './Input.module.scss';
export interface InputProps {
  label: string;
  value: string;
  onReturn?: (value: string) => void;
  onChange: (value: string) => void;
}

export const Input: FC<InputProps> = ({value, label, onReturn, onChange}) => {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <input
        type="text"
        value={value}
        onChange={x => onChange(x.target.value)}
        onKeyDown={x => {
          if (x.key !== 'Enter') return;
          onReturn?.(value);
        }}
      />
    </label>
  );
};
