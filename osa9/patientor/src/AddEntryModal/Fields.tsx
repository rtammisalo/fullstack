import { Field } from "formik";
import { SelectField, SelectFieldOption, TextField } from "../AddPatientModal/FormField";
import { EntryType, HealthCheckRating } from "../types";

interface Props {
  type: EntryType;
}

const healthRatingOptions: SelectFieldOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'Low risk' },
  { value: HealthCheckRating.HighRisk, label: 'High risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'Critical risk' },
];

export const HospitalFields = ({ type }: Props) => {
  if (type !== EntryType.Hospital) return null;

  return (
    <div>
      <Field
        label="Discharge date"
        placeholder="YYYY-MM-DD"
        name="discharge.date"
        component={TextField}
      />
      <Field
        label="Discharge criteria"
        placeholder="Discharge criteria"
        name="discharge.criteria"
        component={TextField}
      />
    </div>
  );
};

export const HealthCheckFields = ({ type }: Props) => {
  if (type !== EntryType.HealthCheck) return null;

  return (
    <SelectField
      label="Health rating"
      name="healthCheckRating"
      options={healthRatingOptions}
    />
  );
};

export const OccupationalHealthcareFields = ({ type }: Props) => {
  if (type !== EntryType.OccupationalHealthcare) return null;

  return (
    <div>
      <Field
        label="Employer name"
        placeholder="Employer name"
        name="employerName"
        component={TextField}
      />
      <Field
        label="Sick leave start date"
        placeholder="YYYY-MM-DD"
        name="sickLeave.startDate"
        component={TextField}
      />
      <Field
        label="Sick leave end date"
        placeholder="YYYY-MM-DD"
        name="sickLeave.endDate"
        component={TextField}
      />
    </div>
  );
};
