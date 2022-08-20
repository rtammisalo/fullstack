import { NewPatient } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (data: any): NewPatient => {
  const newPatient: NewPatient = {
    name: data.name as string,
    dateOfBirth: data.dateOfBirth as string,
    ssn: data.ssn as string,
    gender: data.gender as string,
    occupation: data.occupation as string
  };

  return newPatient;
};

export default toNewPatient;