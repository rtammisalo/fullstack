import { Typography, List } from "@material-ui/core";
import { Entry } from '../types';
import EntryListItem from "./EntryListItem";

interface EntryListProps {
  entries: Array<Entry>;
}

const EntryList = ({ entries }: EntryListProps) => {
  if (!entries) return null;

  return (
    <div>
      <Typography variant="h6" style={{ marginBottom: "0.5em" }}>
        <b>entries</b>
      </Typography>
      <List style={{ fontSize: 18, wordWrap: 'break-word' }}>
        {entries.map(entry => <EntryListItem key={entry.id} entry={entry} />)}
      </List>
    </div>
  );
};

export default EntryList;
