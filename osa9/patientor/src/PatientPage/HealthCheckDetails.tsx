import { Box, Typography } from "@material-ui/core";
import Rating from '@mui/material/Rating';
import { Favorite } from "@mui/icons-material";
import { HealthCheckEntry } from '../types';
import DiagnosisList from "./DiagnosisList";

interface HealthCheckDetailsProps {
  entry: HealthCheckEntry;
}

const HealthCheckDetails = ({ entry }: HealthCheckDetailsProps) => {
  if (!entry) return null;

  return (
    <div>
      <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
      <Box>
        <Typography>Healthcheck rating:</Typography>
        <Rating max={4} value={4 - entry.healthCheckRating.valueOf()}
          icon={<Favorite fontSize='small' htmlColor='red' />}
          emptyIcon={<Favorite fontSize='small' />}
          readOnly
        />
      </Box>
    </div>
  );
};

export default HealthCheckDetails;
