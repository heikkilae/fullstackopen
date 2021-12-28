export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export type Diagnose = Omit<DiagnoseEntry, 'latin'>;
