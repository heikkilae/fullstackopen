import {
  Gender,
  NewPatientEntryWithEntries,
  Entry,
  NewEntry,
  NewHealthCheckEntry,
  NewOccupationalHealthcareEntry,
  SickLeave,
  HealthCheckRating,
  NewHospitalEntry,
  Discharge,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
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
    throw new Error("Incorrect or missing date: " + date);
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
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (entry: any): entry is Entry => {
  return (<Entry>entry).id !== undefined;
};

const parseEntries = (entries: unknown): Array<Entry> => {
  if (!entries) throw new Error("Entries not defined");
  if (!Array.isArray(entries)) throw new Error("entries is not array");
  if (!entries.every((e) => isEntry(e)))
    throw new Error(`One of entries is not type of Entry`);
  return entries.map((e) => e as Entry);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (object: any): NewPatientEntryWithEntries => {
  const newEntry: NewPatientEntryWithEntries = {
    name: parseString("name", object.name),
    ssn: parseString("ssn", object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseString("occupation", object.occupation),
    entries: parseEntries(object.entries ? object.entries : []),
  };

  return newEntry;
};

const parseDiagnosisCodes = (array: unknown): Array<string> => {
  if (!array) throw new Error("Array not defined");
  if (!Array.isArray(array)) throw new Error("diagnosisCodes is not array");
  if (!array.every((e) => isString(e)))
    throw new Error(`One of items is not type of string`);
  return array.map((e) => e as string);
};

const parseEntryType = (
  type: unknown
): "HealthCheck" | "OccupationalHealthcare" | "Hospital" => {
  if (!type) throw new Error("Type not defined");
  if (!isString(type)) throw new Error("Type is not in string format");

  switch (type) {
    case "HealthCheck":
      return "HealthCheck";
    case "OccupationalHealthcare":
      return "OccupationalHealthcare";
    case "Hospital":
      return "Hospital";
    default:
      throw new Error("Unknown type");
  }
};

const parseHealthCheckRating = (type: any): HealthCheckRating => {
  if (!type) throw new Error("HealthCheckRating not defined");
  if (!isString(type))
    throw new Error("HealthCheckRating is not in string format");

  switch (type) {
    case "Healthy":
      return 0;
    case "LowRisk":
      return 1;
    case "HighRisk":
      return 2;
    case "CriticalRisk":
      return 3;
    default:
      throw new Error("Unknown type");
  }
};

const parseSickLeave = (object: any): SickLeave => {
  if (!object) throw new Error("Object for sickleave not defined");
  const startDate = parseDate(object.startDate);
  const endDate = parseDate(object.endDate);
  return { startDate, endDate };
};

const parseDischarge = (object: any): Discharge => {
  if (!object) throw new Error("Object for discharge not defined");
  const date = parseDate(object.date);
  const criteria = parseString("criteria", object.criteria);
  return { date, criteria };
};

export const toNewEntry = (
  object: any
): NewHospitalEntry | NewOccupationalHealthcareEntry | NewHealthCheckEntry => {
  const type = parseEntryType(object.type);

  const newBaseEntry: NewEntry = {
    description: parseString("description", object.description),
    date: parseDate(object.date),
    specialist: parseString("specialist", object.specialist),
    diagnosisCodes:
      object.diagnosisCodes !== undefined
        ? parseDiagnosisCodes(object.diagnosisCodes)
        : [],
    type: type,
  };

  switch (type) {
    case "HealthCheck":
      return {
        ...newBaseEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      } as NewHealthCheckEntry;
    case "OccupationalHealthcare":
      return {
        ...newBaseEntry,
        employerName: parseString("employerName", object.employerName),
        sickLeave:
          object.sickLeave !== undefined
            ? parseSickLeave(object.sickLeave)
            : undefined,
      } as NewOccupationalHealthcareEntry;
    case "Hospital":
      return {
        ...newBaseEntry,
        diagnosisCodes:
          object.diagnosisCodes !== undefined
            ? parseDiagnosisCodes(object.diagnosisCodes)
            : [],
        discharge: parseDischarge(object.discharge),
      } as NewHospitalEntry;

    // Just for safe, but it shouldn't ever come here since we parse entry type and that would cause exception.
    default:
      throw new Error("Cannot convert to new entry. Unknown type.");
  }
};

export default toNewPatientEntry;
