enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Entry {
}

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

export { Diagnose, Patient, PublicPatient, NewPatient, Gender, Entry };
