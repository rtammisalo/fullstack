import { v1 as uuid } from 'uuid';
import patients from '../../data/patients.json';
import { NewPatient, Patient, PatientWithoutSsn } from '../types';

const getAll = (): Array<Patient> => {
  return patients;
};

const getAllWithoutSsn = (): Array<PatientWithoutSsn> => {
  return patients.map(({ ssn: _ssn, ...patientWithoutSsn }) => patientWithoutSsn);
};

const addPatient = (newPatient: NewPatient): Patient => {
  const id: string = uuid();
  const savedPatient: Patient = { ...newPatient, id };
  patients.push(savedPatient);
  return savedPatient;
};

export default { getAll, getAllWithoutSsn, addPatient };
