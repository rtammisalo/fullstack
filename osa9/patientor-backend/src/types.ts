interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

type PatientWithoutSsn = Omit<Patient, 'ssn'>;
type NewPatient = Omit<Patient, 'id'>;

export { Diagnose, Patient, PatientWithoutSsn, NewPatient };
