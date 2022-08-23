import { Grid } from "@material-ui/core";
import { OccupationalHealthcareEntry } from '../types';

interface OccupationalHealthcareDetailsProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareDetails = ({ entry }: OccupationalHealthcareDetailsProps) => {
  if (!entry) return null;

  return (
    <Grid container spacing={1} style={{ minWidth: 400, maxWidth: 600 }}>
      {entry.sickLeave ?
        <>
          <Grid item xs={3}>
            Sick leave:
          </Grid>
          <Grid item xs={9}>
            {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
          </Grid>
        </>
        : null}
      <Grid item xs={3}>
        Employer:
      </Grid>
      <Grid item xs={9}>
        {entry.employerName}
      </Grid>
    </Grid >
  );
};

export default OccupationalHealthcareDetails;
