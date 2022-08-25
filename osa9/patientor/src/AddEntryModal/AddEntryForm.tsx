import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import React, { useState } from "react";
import { TextField, DiagnosisSelection, SelectFieldOption, SelectField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Entry, EntryType, HealthCheckRating } from "../types";
import { assertNever } from "../utils";
import { HealthCheckFields, HospitalFields, OccupationalHealthcareFields } from "./Fields";

// Define special omit for unions, from course materials (Part 9d).
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryFormValues = UnionOmit<Entry, 'id'>;

// description: string;
// date: string;
// specialist: string;
// diagnosisCodes?: Array<Diagnosis['code']>;

// type: EntryType.HealthCheck;
// healthCheckRating: HealthCheckRating;

// type: EntryType.OccupationalHealthcare;
// employerName: string;
// sickLeave?: SickLeave; startDate - endDate

// type: EntryType.Hospital;
// discharge: Discharge; date, criteria

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const initialBaseValues = {
  description: "",
  date: new Date().toISOString().substring(0, 10),
  specialist: "",
  diagnosisCodes: new Array<string>()
};

const initialHospitalValues = {
  discharge: {
    date: "",
    criteria: ""
  },
};

const initialOccupationalValues = {
  employerName: "",
  sickLeave: {
    startDate: "",
    endDate: ""
  },
};

const initialHealthCheckValues = {
  healthCheckRating: 0,
};

const entryTypeOptions: SelectFieldOption[] = [
  { value: EntryType.HealthCheck, label: 'Health check' },
  { value: EntryType.Hospital, label: 'Hospital' },
  { value: EntryType.OccupationalHealthcare, label: 'Occupational healthcare' }
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  const [type, setType] = useState<EntryType>(EntryType.HealthCheck);

  const submitSelectedEntry = (values: EntryFormValues) => {
    const baseValues = {
      description: values.description,
      date: values.date,
      specialist: values.specialist,
      diagnosisCodes: values.diagnosisCodes
    };
    let selectedValues: EntryFormValues;

    switch (values.type) {
      case EntryType.HealthCheck:
        selectedValues = {
          type: values.type,
          ...baseValues,
          healthCheckRating: values.healthCheckRating
        };
        break;
      case EntryType.Hospital:
        selectedValues = {
          type: values.type,
          ...baseValues,
          discharge: {
            date: values.discharge.date,
            criteria: values.discharge.criteria
          }
        };
        break;
      case EntryType.OccupationalHealthcare:
        const sickLeave = values.sickLeave?.startDate.length
          ? {
            startDate: values.sickLeave.startDate,
            endDate: values.sickLeave.endDate
          }
          : undefined;

        selectedValues = {
          type: values.type,
          ...baseValues,
          employerName: values.employerName,
          sickLeave: sickLeave
        };
        break;
      default:
        return assertNever(values);
    }

    onSubmit(selectedValues);
  };

  return (
    <Formik
      initialValues={{
        ...initialBaseValues,
        ...initialHospitalValues,
        ...initialOccupationalValues,
        ...initialHealthCheckValues,
        type: EntryType.HealthCheck
      }}
      onSubmit={submitSelectedEntry}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: { [field: string]: string } | string } = {};

        if (!values.description) {
          errors.description = requiredError;
        }

        if (!values.date) {
          errors.date = requiredError;
        }

        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        switch (values.type) {
          case EntryType.Hospital:
            const hospitalErrors: { [field: string]: string } = {};

            if (!values.discharge.date) {
              hospitalErrors.date = requiredError;
            }
            if (!values.discharge.criteria) {
              hospitalErrors.criteria = requiredError;
            }

            if (Object.entries(hospitalErrors).length) {
              errors.discharge = hospitalErrors;
            }

            break;
          case EntryType.HealthCheck:
            if (!(Object.values(HealthCheckRating).includes(values.healthCheckRating))) {
              errors.healthCheckRating = requiredError;
            }
            break;
          case EntryType.OccupationalHealthcare:
            if (!values.employerName) {
              errors.employerName = requiredError;
            }

            if (!values.sickLeave?.startDate && !values.sickLeave?.endDate) {
              break;
            }

            const sickLeaveErrors: { [field: string]: string } = {};

            if (!values.sickLeave?.startDate) {
              sickLeaveErrors.startDate = requiredError;
            }

            if (!values.sickLeave?.endDate) {
              sickLeaveErrors.endDate = requiredError;
            }

            if (Object.entries(sickLeaveErrors).length) {
              errors.sickLeave = sickLeaveErrors;
            }

            break;
          default:
            return assertNever(values);
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        const changeType = (event: React.ChangeEvent<{ value: unknown }>) => {
          const newType = event.target.value as EntryType;
          setType(newType);
          setFieldValue('type', newType);
        };

        return (
          <Form className="form ui">
            <SelectField
              label="Entry type"
              name="entryType"
              options={entryTypeOptions}
              onChange={changeType}
              value={type}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <HospitalFields type={type} />
            <HealthCheckFields type={type} />
            <OccupationalHealthcareFields type={type} />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik >
  );
};

export default AddEntryForm;
