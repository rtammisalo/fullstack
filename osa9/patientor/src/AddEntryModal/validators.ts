import { HospitalEntry, OccupationalHealthcareEntry } from "../types";

export interface FormErrors {
  [field: string]: { [field: string]: string } | string;
}

const requiredError = 'Field is required';
// const malformattedError = 'Value is malformatted';
const malformattedDateError = 'Value is malformatted (YYYY-MM-DD)';

const isDate = (date: string): boolean => {
  if (isNaN(Date.parse(date))) return false;

  return (/^\d{4}-\d{2}-\d{2}$/).test(date);
};

export const dateValidator = (date: string, errors: FormErrors) => {
  if (!date) {
    errors.date = requiredError;
    return;
  }

  if (!isDate(date)) {
    errors.date = malformattedDateError;
  }
};

export const hospitalEntryValidator = (values: Omit<HospitalEntry, 'id'>,
  errors: FormErrors) => {
  const hospitalErrors: { [field: string]: string } = {};

  if (!values.discharge.date) {
    hospitalErrors.date = requiredError;
  } else if (!isDate(values.discharge.date)) {
    hospitalErrors.date = malformattedDateError;
  }

  if (!values.discharge.criteria) {
    hospitalErrors.criteria = requiredError;
  }

  if (Object.entries(hospitalErrors).length) {
    errors.discharge = hospitalErrors;
  }
};

export const occupationalHealthcareValidator = (values: Omit<OccupationalHealthcareEntry, 'id'>,
  errors: FormErrors) => {

  if (!values.employerName) {
    errors.employerName = requiredError;
  }

  if (!values.sickLeave?.startDate && !values.sickLeave?.endDate) {
    // These fields can be considered not required
    return;
  }

  const sickLeaveErrors: { [field: string]: string } = {};

  if (!values.sickLeave?.startDate) {
    sickLeaveErrors.startDate = requiredError;
  } else if (!isDate(values.sickLeave?.startDate)) {
    sickLeaveErrors.startDate = malformattedDateError;
  }

  if (!values.sickLeave?.endDate) {
    sickLeaveErrors.endDate = requiredError;
  } else if (!isDate(values.sickLeave?.endDate)) {
    sickLeaveErrors.endDate = malformattedDateError;
  }

  if (Object.entries(sickLeaveErrors).length) {
    errors.sickLeave = sickLeaveErrors;
  }

};