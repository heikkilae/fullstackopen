import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { NonSensitivePatientorEntry, PatientorEntry, NewPatientEntry } from '../types';

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

const addPatient = (entry: NewPatientEntry): PatientorEntry => {
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
  getNonSensitiveEntries
};
