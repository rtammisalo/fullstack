import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients.json';
import { NewPatient, Patient, PatientWithoutSsn } from '../types';
import { toNewPatient } from '../utils';

const patients: Array<Patient> = patientsData.map(data => {
  return { ...toNewPatient(data), id: data.id };
});

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
