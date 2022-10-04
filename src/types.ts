export type TableData = readonly TableItem[];

export interface TableItem {
  readonly id: string;
  readonly date: string;
  readonly name: string;
  readonly quantity: number;
  readonly distance: number;
}
