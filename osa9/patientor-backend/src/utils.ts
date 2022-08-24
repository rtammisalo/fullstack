import { NewPatient, Gender, Entry, EntryType, NewEntry, NewBaseEntry, Discharge, SickLeave, Diagnosis } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Name is missing or not a valid value');
  }

  return name;
};

const isDate = (dateOfBirth: string): boolean => {
  if (!Date.parse(dateOfBirth)) return false;

  return dateOfBirth.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
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
  if (!entry || !entry.type || !isString(entry.type)) {
    return false;
  }

  switch (entry.type) {
    case 'HealthCheck':
    case 'Hospital':
    case 'OccupationalHealthcare':
      return true;
    default:
      return false;
  }
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (type: any): type is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(type);
};

const parseType = (type: unknown): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error('EntryType is missing or not a valid value');
  }

  return type;
};

const assertNever = (item: never, message: string): never => {
  throw new Error(message + JSON.stringify(item));
};

const parseHealthCheckRating = (rating: unknown): number => {
  if (rating === undefined || !isNumber(rating)) {
    throw new Error('health check rating is missing or not a valid value');
  }

  return rating;
};

const parseDescription = (desc: unknown): string => {
  if (!desc || !isString(desc)) {
    throw new Error('Description is missing or not a valid value');
  }

  return desc;
};

const parseDate = (date: unknown, checkType: string): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(checkType + ': Date is missing or not a valid date');
  }

  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Specialist is missing or not a valid value');
  }

  return specialist;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Discharge criteria missing or not a valid value');
  }

  return criteria;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !discharge.date || !discharge.criteria) {
    throw new Error('Discharge is missing or malformatted');
  }

  return {
    date: parseDate(discharge.date, 'Discharge'),
    criteria: parseCriteria(discharge.criteria)
  };
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Employer name is missing or not a valid value');
  }

  return employerName;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave) {
    throw new Error('Sick leave is missing');
  }

  return {
    startDate: parseDate(sickLeave.startDate, 'SickLeave'),
    endDate: parseDate(sickLeave.endDate, 'SickLeave')
  };
};

const isDiagnosisCode = (diagnosisCode: unknown): diagnosisCode is string => {
  if (!diagnosisCode || !isString(diagnosisCode)) {
    throw new Error('Diagnosis code is missing or not a valid value');
  }

  return true;
};

const parseDiagnosisCode = (diagnosisCode: unknown): Diagnosis['code'] => {
  if (!diagnosisCode || !isDiagnosisCode(diagnosisCode)) {
    throw new Error('Diagnosis code value is missing or not valid');
  }

  return diagnosisCode;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> => {
  if (!diagnosisCodes || !(diagnosisCodes instanceof Array)) {
    throw new Error('DiagnosisCodes are missing or not an array');
  }

  const codes = diagnosisCodes.map(code => parseDiagnosisCode(code));

  return codes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (data: any): NewEntry => {
  const type = parseType(data.type);
  const baseProperties: NewBaseEntry = {
    description: parseDescription(data.description),
    date: parseDate(data.date, 'Entry'),
    specialist: parseSpecialist(data.specialist),
    diagnosisCodes: data.diagnosisCodes
      ? parseDiagnosisCodes(data.diagnosisCodes)
      : undefined
  };
  let newEntry: NewEntry;

  switch (type) {
    case EntryType.HealthCheck:
      newEntry = {
        ...baseProperties,
        type: type,
        healthCheckRating: parseHealthCheckRating(data.healthCheckRating)
      };
      break;
    case EntryType.Hospital:
      newEntry = {
        ...baseProperties,
        type: type,
        discharge: parseDischarge(data.discharge)
      };
      break;
    case EntryType.OccupationalHealthcare:
      newEntry = {
        ...baseProperties,
        type: type,
        employerName: parseEmployerName(data.employerName),
        sickLeave: data.sickLeave ? parseSickLeave(data.sickLeave) : undefined
      };
      break;
    default:
      return assertNever(type, 'Unchecked EntryType:');
  }

  return newEntry;
};

export { toNewPatient, parsePatientId, toNewEntry };