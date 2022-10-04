import {ReactElement, useEffect, useRef, useState} from 'react';
import {ArrowIcon} from '../ArrowIcon/ArrowIcon';
import {ClearButton} from '../ClearButton/ClearButton';
import styles from './Select.module.scss';

export interface Option<T> {
  value: T;
  label: string;
}

export interface SelectProps<T> {
  label: string;
  value: string | null;
  onChange: (value: T | null) => void;
  options: Option<T>[];
}

export function Select<T>({
  label,
  value,
  onChange,
  options,
}: SelectProps<T>): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Node)) return;
      if (!fieldRef.current) return;
      if (fieldRef.current.contains(event.target)) return;
      setIsOpen(false);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  return (
    <div
      ref={fieldRef}
      tabIndex={0}
      className={styles.field}
      onKeyDown={e => (e.key === 'Enter' ? setIsOpen(true) : null)}
      onClick={() => setIsOpen(true)}
    >
      <div className={styles.summary}>
        <div className={styles.label}>
          <span>{label}</span>
          <ArrowIcon direction={isOpen ? 'up' : 'down'} />
        </div>
        <CurrentOption<T>
          option={options.find(x => x.value === value) ?? null}
          onClear={() => onChange(null)}
        />
      </div>
      <DropDown<T>
        isOpen={isOpen}
        options={options}
        onOptionSelect={option => {
          setIsOpen(false);
          if (option.value === value) return;
          onChange(option.value);
        }}
      />
    </div>
  );
}

interface CurrentOptionProps<T> {
  option: Option<T> | null;
  onClear: () => void;
}

function CurrentOption<T>({
  option,
  onClear,
}: CurrentOptionProps<T>): ReactElement | null {
  if (!option) return null;
  return (
    <div className={styles.currentOption}>
      <span>{option.label}</span>
      <ClearButton onPress={onClear} />
    </div>
  );
}

interface DropDownProps<T> {
  isOpen: boolean;
  options: Option<T>[];
  onOptionSelect: (option: Option<T>) => void;
}

function DropDown<T>({
  isOpen,
  options,
  onOptionSelect,
}: DropDownProps<T>): ReactElement | null {
  if (!isOpen) return null;
  return (
    <div className={styles.dropDown} onClick={e => e.stopPropagation()}>
      {options.map(option => (
        <button
          type="button"
          className={styles.option}
          key={String(option.value)}
          onClick={() => onOptionSelect(option)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
