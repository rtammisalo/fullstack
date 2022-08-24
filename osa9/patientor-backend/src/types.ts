enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export enum EntryType {
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
  HealthCheck = 'HealthCheck'
}

interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: Discharge;
}

type Entry = | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Array<Entry>;
}

type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
type NewPatient = Omit<Patient, 'id'>;

// Define special omit for unions, from course materials (Part 9d).
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
type NewEntry = UnionOmit<Entry, 'id'>;

type NewBaseEntry = Omit<BaseEntry, 'id'>;

export {
  Diagnosis, Patient, PublicPatient, Discharge, SickLeave,
  NewPatient, Gender, Entry, NewEntry, NewBaseEntry
};
