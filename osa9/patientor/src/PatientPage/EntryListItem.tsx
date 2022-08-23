import { Divider, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Entry } from '../types';
import { BusinessCenter, LocalHospital, PersonSearch } from "@mui/icons-material";
import HospitalDetails from './HospitalDetails';
import HealthCheckDetails from './HealthCheckDetails';
import OccupationalHealthcareDetails from './OccupationalHealthcareDetails';
import DiagnosisList from "./DiagnosisList";

interface EntryListItemProps {
  entry: Entry;
}

const assertNever = (item: never) => {
  throw new Error('Switch case missing: ' + JSON.stringify(item));
};

const EntryListItem = ({ entry }: EntryListItemProps) => {
  if (!entry) return null;

  const EntryIcon = (entry: Entry) => {
    switch (entry.type) {
      case 'Hospital':
        return <LocalHospital />;
      case 'HealthCheck':
        return <PersonSearch />;
      case 'OccupationalHealthcare':
        return <BusinessCenter />;
      default:
        assertNever(entry);
    }
  };

  const EntryDetail = (entry: Entry) => {
    switch (entry.type) {
      case 'Hospital':
        return <HospitalDetails key={entry.id} entry={entry} />;
      case 'HealthCheck':
        return <HealthCheckDetails key={entry.id} entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareDetails key={entry.id} entry={entry} />;
      default:
        assertNever(entry);
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
