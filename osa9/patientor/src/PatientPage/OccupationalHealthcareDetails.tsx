import { Box, ListItemText } from "@material-ui/core";
import { OccupationalHealthcareEntry } from '../types';
import DiagnosisList from "./DiagnosisList";

interface OccupationalHealthcareDetailsProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareDetails = ({ entry }: OccupationalHealthcareDetailsProps) => {
  if (!entry) return null;

  return (
    <div>
      <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
      <Box sx={{ display: 'grid', gridTemplateColumns: '8em auto' }}>
        {entry.sickLeave ?
          <>
            <ListItemText>Sick leave:</ListItemText>
            <ListItemText>
              {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
            </ListItemText>
          </>
          : null}
        <ListItemText>Employer:</ListItemText>
        <ListItemText>{entry.employerName}</ListItemText>
      </Box>
    </div>
  );
};

export default OccupationalHealthcareDetails;
