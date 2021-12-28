import patients from '../../data/patients';
import { NonSensitivePatientorEntry, PatientorEntry } from '../types';

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

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries
};
