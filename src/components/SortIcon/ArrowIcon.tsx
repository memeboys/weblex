import classNames from "classnames";
import { FC } from "react";
import styles from "./ArrowIcon.module.scss";

export type Direction = "left" | "up" | "right" | "down";

export interface SortIconProps {
  direction?: Direction;
}

export const ArrowIcon: FC<SortIconProps> = ({ direction = "left" }) => (
  <svg
    className={classNames(styles.sortIcon, styles[direction])}
    viewBox="0 0 11 14"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.52814 0.118329C0.8533 -0.055691 1.24784 -0.0366211 1.5547 0.167949L10.5547 6.16795C10.8329 6.35342 11 6.66565 11 7C11 7.3344 10.8329 7.6466 10.5547 7.8321L1.5547 13.8321C1.24784 14.0366 0.8533 14.0557 0.52814 13.8817C0.20298 13.7077 0 13.3688 0 13V0.999999C0 0.631209 0.20298 0.292349 0.52814 0.118329ZM2 2.86852V11.1315L8.1972 7L2 2.86852Z" />
  </svg>
)