import { FC, useEffect, useRef, useState } from "react";
import { ClearButton } from "../ClearButton/ClearButton";
import { ArrowIcon } from "../SortIcon/ArrowIcon";
import styles from "./Select.module.scss";

export interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  options: Option[];
}

export const Select: FC<SelectProps> = ({ label, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Node)) return;
      if (!fieldRef.current) return;
      if (fieldRef.current.contains(event.target)) return;
      setIsOpen(false);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick)
  }, [isOpen]);

  return (
    <div
      ref={fieldRef}
      tabIndex={0}
      className={styles.field}
      onKeyDown={(e) => e.key === "Enter" ? setIsOpen(true) : null}
      onClick={() => setIsOpen(true)}>
      <div className={styles.summary}>
        <div className={styles.label}>
          <span>{label}</span>
          <ArrowIcon direction={isOpen ? "up" : "down"} />
        </div>
        <CurrentOption option={options.find(x => x.value === value) ?? null} onClear={() => onChange(null)} />
      </div>
      <DropDown
        isOpen={isOpen}
        options={options}
        onOptionSelect={(option) => {
          setIsOpen(false);
          onChange(option.value);
        }} />
    </div>
  )
}

interface CurrentOptionProps {
  option: Option | null;
  onClear: () => void;
}

const CurrentOption: FC<CurrentOptionProps> = ({ option, onClear }) => {
  if (!option) return null;
  return (
    <div className={styles.currentOption}>
      <span>{option.label}</span>
      <ClearButton onPress={onClear} />
    </div>
  );
}

interface DropDownProps {
  isOpen: boolean;
  options: Option[];
  onOptionSelect: (option: Option) => void;
}

const DropDown: FC<DropDownProps> = ({ isOpen, options, onOptionSelect }) => {
  if (!isOpen) return null;
  return (
    <div className={styles.dropDown} onClick={e => e.stopPropagation()}>
      {options.map((option) => (
        <button
          type="button"
          className={styles.option}
          key={option.value}
          onClick={() => onOptionSelect(option)}>{option.label}</button>
      ))}
    </div>
  );
}