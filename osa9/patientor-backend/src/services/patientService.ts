import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { NewPatient, Patient, PublicPatient } from '../types';

const getAll = (): Array<Patient> => {
  return patients;
};

const getAllPublic = (): Array<PublicPatient> => {
  return patients.map(({ ssn: _ssn, entries: _entries, ...publicPatient }) =>
    publicPatient);
};

const addPatient = (newPatient: NewPatient): Patient => {
  const id: string = uuid();
  const savedPatient: Patient = { ...newPatient, id };
  patients.push(savedPatient);
  return savedPatient;
};

const getPatient = (patientId: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === patientId);
  return patient;
};

export default { getAll, getAllPublic, addPatient, getPatient };
