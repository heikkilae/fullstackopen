import diagnoses from '../../data/diagnoses';
import { Diagnose, DiagnoseEntry } from '../types';

const getEntries = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

const getSensitiveEntries = (): Diagnose[] => {
  return diagnoses.map(({ code, name }) => ({
    code,
    name
  }));
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
  getSensitiveEntries
};
