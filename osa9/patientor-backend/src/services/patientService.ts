import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients.json';
import { NewPatient, Patient, PublicPatient } from '../types';
import { toNewPatient } from '../utils';

const patients: Array<Patient> = patientsData.map(data => {
  return { ...toNewPatient(data), id: data.id };
});

const getAll = (): Array<Patient> => {
  return patients;
};

const getAllPublic = (): Array<PublicPatient> => {
  return patients.map(({ ssn: _ssn, ...patientWithoutSsn }) => patientWithoutSsn);
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
