export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export type NonSensitiveDiagnoseEntry = Omit<DiagnoseEntry, "latin">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface PatientorEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
}

export type NewPatientEntry = Omit<PatientorEntry, "id">;
export type NonSensitivePatientorEntry = Omit<PatientorEntry, "ssn">;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Diagnosis {
  code: { [id: string]: string };
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient extends PatientorEntry {
  entries: Entry[];
}

export type NewEntry = Omit<Entry, "id">;
export type NewHospitalEntry = Omit<HospitalEntry, "id">;
export type NewOccupationalHealthcareEntry = Omit<
  OccupationalHealthcareEntry,
  "id"
>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, "id">;

export interface NewPatientEntryWithEntries extends NewPatientEntry {
  entries: Entry[];
}
