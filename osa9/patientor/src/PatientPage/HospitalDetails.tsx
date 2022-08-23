import { ListItemText, Box } from "@material-ui/core";
import { HospitalEntry } from '../types';
import DiagnosisList from "./DiagnosisList";

interface HospitalDetailsProps {
  entry: HospitalEntry;
}

const HospitalDetails = ({ entry }: HospitalDetailsProps) => {
  if (!entry) return null;

  return (
    <div>
      <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
      <Box sx={{ display: 'grid', gridTemplateColumns: '8em auto' }}>
        <ListItemText>Discharge date:</ListItemText>
        <ListItemText>{entry.discharge.date}</ListItemText>
        <ListItemText>Discharge criteria:</ListItemText>
        <ListItemText>{entry.discharge.criteria}</ListItemText>
      </Box>
    </div>
  );
};

export default HospitalDetails;
