import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { NonSensitivePatientorEntry, PatientorEntry, NewPatientEntryWithEntries, Patient } from '../types';

const getEntries = (): Array<PatientorEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientorEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (id: string): Patient | undefined  => {
  const patientEntry = patients.find(p => p.id === id);
  if (patientEntry) {
    return (patientEntry);
  } else {
    return undefined;
  }
};

const addPatient = (entry: NewPatientEntryWithEntries): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addPatient,
  getPatient,
  getNonSensitiveEntries
};
