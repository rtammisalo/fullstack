import diagnosisService from "../services/diagnosisService";
import { Diagnosis, Discharge, EntryType, NewBaseEntry, NewEntry, SickLeave } from "../types";
import { assertNever, isDate, isNumber, isString, isEntryType } from "./utils";

const parseType = (type: unknown): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error('EntryType is missing or not a valid value');
  }

  return type;
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
  if (!diagnosisCode || !isString(diagnosisCode)
    || !diagnosisService.getAll().find(d => d.code === diagnosisCode)) {
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
      return assertNever('Unchecked EntryType:', type);
  }

  return newEntry;
};

export { toNewEntry };
