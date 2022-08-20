import patients from '../../data/patients.json';
import { Patient, PatientWithoutSsn } from '../types';

const getAll = (): Array<Patient> => {
  return patients;
};

const getAllWithoutSsn = (): Array<PatientWithoutSsn> => {
  return patients.map(({ ssn: _ssn, ...patientWithoutSsn }) => patientWithoutSsn);
};

export default { getAll, getAllWithoutSsn };
