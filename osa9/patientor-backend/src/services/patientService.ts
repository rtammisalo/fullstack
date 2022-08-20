import patients from '../../data/patients.json';
import { Patient, PatientWithoutSsn } from '../types';

const getAll = (): Array<Patient> => {
  return patients;
};

const getAllWithoutSsn = (): Array<PatientWithoutSsn> => {
  return patients.map((patient) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...patientWithoutSsn } = patient;
    return patientWithoutSsn;
  });
};

export default { getAll, getAllWithoutSsn };
