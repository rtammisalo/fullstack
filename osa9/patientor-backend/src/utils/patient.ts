import { Entry, Gender, NewPatient } from "../types";
import { isDate, isEntryType, isString } from "./utils";

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Name is missing or not a valid value');
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Date of birth is missing or not a valid date');
  }

  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  // Add better parsing if we know what SSN types are in use
  if (!ssn || !isString(ssn)) {
    throw new Error('SSN is missing or not a valid value');
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Occupation is missing or not a valid value');
  }

  return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Gender is missing or not a valid value');
  }

  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (entry: any): entry is Entry => {
  if (!entry || !entry.type || !isString(entry.type) || !isEntryType(entry.type)) {
    return false;
  }

  return true;
};

const isEntriesArray = (entries: unknown): entries is Array<Entry> => {
  return entries instanceof Array && entries.every(entry => isEntry(entry));
};

const parseEntries = (entries: unknown): Array<Entry> => {
  if (!entries) {
    return [];
  }

  if (!isEntriesArray(entries)) {
    throw new Error('Entries is not a valid list of entries');
  }

  return entries;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (data: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(data.name),
    dateOfBirth: parseDateOfBirth(data.dateOfBirth),
    ssn: parseSsn(data.ssn),
    gender: parseGender(data.gender),
    occupation: parseOccupation(data.occupation),
    entries: parseEntries(data.entries)
  };

  return newPatient;
};

const parsePatientId = (id: unknown): string => {
  if (!id || !isString(id)) {
    throw new Error('patientId is missing or not a valid value');
  }

  return id;
};

export { toNewPatient, parsePatientId };
