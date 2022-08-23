import { Grid } from "@material-ui/core";
import { HospitalEntry } from '../types';

interface HospitalDetailsProps {
  entry: HospitalEntry;
}

const HospitalDetails = ({ entry }: HospitalDetailsProps) => {
  if (!entry) return null;

  return (
    <Grid container spacing={1} style={{ minWidth: 400, maxWidth: 600 }} >
      <Grid item xs={4}>Discharge date:</Grid>
      <Grid item xs={8}>{entry.discharge.date}</Grid>
      <Grid item xs={4}>Discharge criteria:</Grid>
      <Grid item xs={8}>{entry.discharge.criteria}</Grid>
    </Grid>
  );
};

export default HospitalDetails;
