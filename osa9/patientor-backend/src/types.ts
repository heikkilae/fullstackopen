export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export type NonSensitiveDiagnoseEntry = Omit<DiagnoseEntry, 'latin'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
} 

export interface PatientorEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
}

export type NewPatientEntry = Omit<PatientorEntry, 'id'>;
export type NonSensitivePatientorEntry = Omit<PatientorEntry, 'ssn'>;
