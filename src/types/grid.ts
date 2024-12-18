export interface Position {
  x: number;
  y: number;
}

export interface CellData {
  value: string;
  isRed: boolean;
  isBold?: boolean;
  displayValue?: string;
}

export type GridRow = CellData[];
export type GridData = GridRow[];