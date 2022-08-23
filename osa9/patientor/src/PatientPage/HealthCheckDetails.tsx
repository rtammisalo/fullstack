import { Box, Typography } from "@material-ui/core";
import { HealthCheckEntry } from '../types';
import HealthRatingBar from "../components/HealthRatingBar";

interface HealthCheckDetailsProps {
  entry: HealthCheckEntry;
}

const HealthCheckDetails = ({ entry }: HealthCheckDetailsProps) => {
  if (!entry) return null;

  return (
    <Box>
      <Typography>Health rating:</Typography>
      <HealthRatingBar rating={entry.healthCheckRating.valueOf()} showText={false} />
    </Box>
  );
};

export default HealthCheckDetails;
