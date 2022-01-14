import patients from "../../data/patients";
import { v4 as uuidv4 } from "uuid";
import {
  NonSensitivePatientorEntry,
  PatientorEntry,
  NewPatientEntryWithEntries,
  Patient,
  Entry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
  NewHealthCheckEntry,
} from "../types";

const getEntries = (): Array<PatientorEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientorEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  const patientEntry = patients.find((p) => p.id === id);
  if (patientEntry) {
    return patientEntry;
  } else {
    return undefined;
  }
};

const addPatient = (entry: NewPatientEntryWithEntries): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntryForPatient = (
  id: string,
  entry: NewHospitalEntry | NewOccupationalHealthcareEntry | NewHealthCheckEntry
): Entry => {
  const newEntry = {
    id: uuidv4(),
    ...entry,
  };

  const patient = patients.find((patient) => patient.id === id);
  if (patient) patient.entries.push(newEntry);
  else throw new Error("Cannot add new entry for patient");
  return newEntry;
};

export default {
  getEntries,
  addPatient,
  getPatient,
  addEntryForPatient,
  getNonSensitiveEntries,
};
