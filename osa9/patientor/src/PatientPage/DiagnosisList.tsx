import { List, ListItem, ListItemText } from "@material-ui/core";
import { useStateValue } from "../state";
import { Diagnosis } from "../types";

interface DiagnosisListProps {
  diagnosisCodes: Array<Diagnosis['code']> | undefined;
}

const DiagnosisList = ({ diagnosisCodes }: DiagnosisListProps) => {
  const [{ diagnoses }] = useStateValue();

  if (!diagnosisCodes) {
    return null;
  }

  return (
    <List dense={true} >
      {diagnosisCodes.map(code =>
        <ListItem style={{ paddingBottom: 0, paddingTop: 0 }} key={code}>
          <ListItemText primary={code}
            secondary={diagnoses[code] ? diagnoses[code].name : null}
          />
        </ListItem>
      )}
    </List>
  );
};

export default DiagnosisList;
