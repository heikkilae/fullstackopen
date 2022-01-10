import { Gender, NewPatientEntryWithEntries, Entry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (key: string, str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error(`Incorrect or missing ${key}`);
  }

  return str;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (entry: any): entry is Entry => {
  return (<Entry>entry).id !== undefined;
};

const parseEntries = (entries: unknown): Array<Entry> => {
  if (!entries) throw new Error('Entries not defined');
  if (!Array.isArray(entries)) throw new Error('entries is not array');
  if (!entries.every(e => isEntry(e))) throw new Error(`One of entries is not type of Entry`);
  return entries.map(e => e as Entry);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (object: any): NewPatientEntryWithEntries => {
  const newEntry: NewPatientEntryWithEntries = {
    name: parseString('name', object.name),
    ssn: parseString('ssn', object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseString('occupation', object.occupation),
    entries: parseEntries(object.entries)
  };

  return newEntry;
};

export default toNewPatientEntry;
