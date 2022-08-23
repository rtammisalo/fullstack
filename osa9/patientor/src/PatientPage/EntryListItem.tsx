import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Description from '@mui/icons-material/Description';
import { Entry } from '../types';
import { useStateValue } from '../state';

interface EntryListItemProps {
  entry: Entry;
}

const EntryListItem = ({ entry }: EntryListItemProps) => {
  const [{ diagnoses }] = useStateValue();
  if (!entry) return null;

  return (
    <ListItem alignItems="flex-start" style={{
      display: 'grid', gridTemplateColumns: '40px auto',
    }} >
      <div>
        <ListItemIcon>
          <Description />
        </ListItemIcon>
      </div>
      <div style={{ marginTop: 5 }}>
        <ListItemText primary={<>{entry.date} <i>{entry.description}</i></>} />
        <List dense={true} >
          {entry.diagnosisCodes?.map(code =>
            <ListItem key={code}>
              <ListItemText primary={code}
                secondary={diagnoses[code].name}
              />
            </ListItem>
          )}
        </List>
      </div>
    </ListItem>
  );
};

export default EntryListItem;