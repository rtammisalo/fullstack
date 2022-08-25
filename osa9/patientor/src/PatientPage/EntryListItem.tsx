import { Divider, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Entry, EntryType } from '../types';
import { BusinessCenter, LocalHospital, PersonSearch } from "@mui/icons-material";
import HospitalDetails from './HospitalDetails';
import HealthCheckDetails from './HealthCheckDetails';
import OccupationalHealthcareDetails from './OccupationalHealthcareDetails';
import DiagnosisList from "./DiagnosisList";
import { assertNever } from "../utils";

interface EntryListItemProps {
  entry: Entry;
}

const EntryListItem = ({ entry }: EntryListItemProps) => {
  if (!entry) return null;

  const EntryIcon = (entry: Entry) => {
    switch (entry.type) {
      case EntryType.Hospital:
        return <LocalHospital />;
      case EntryType.HealthCheck:
        return <PersonSearch />;
      case EntryType.OccupationalHealthcare:
        return <BusinessCenter />;
      default:
        return assertNever(entry);
    }
  };

  const EntryDetail = (entry: Entry) => {
    switch (entry.type) {
      case EntryType.Hospital:
        return <HospitalDetails key={entry.id} entry={entry} />;
      case EntryType.HealthCheck:
        return <HealthCheckDetails key={entry.id} entry={entry} />;
      case EntryType.OccupationalHealthcare:
        return <OccupationalHealthcareDetails key={entry.id} entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <ListItem alignItems="flex-start" style={{
      border: 'solid', borderWidth: 2, borderRadius: 5,
      display: 'grid', gridTemplateColumns: '40px auto', marginBottom: 5
    }} >
      <ListItemIcon>
        {EntryIcon(entry)}
      </ListItemIcon>
      <div style={{ marginTop: 5 }}>
        <ListItemText><b>{entry.date}</b></ListItemText>
        <ListItemText><i>{entry.description}</i></ListItemText>
        <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
        {EntryDetail(entry)}
        <Divider style={{ marginTop: 5 }} />
        <ListItemText primary={<>diagnose by {entry.specialist}</>} />
      </div>
    </ListItem>
  );
};

export default EntryListItem;
