import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Typography, List, ListItem } from "@material-ui/core";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

import { useStateValue } from "../state";
import { Gender, Patient } from "../types";
import { apiBaseUrl } from "../constants";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  React.useEffect(() => {
    if (!id) return;

    const patient = patients[id];

    if (!patient || patient.ssn) return;

    axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
      .then(result => result.data)
      .then(updatedPatient =>
        dispatch({ type: "UPDATE_PATIENT", payload: updatedPatient }))
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          console.error(error?.response?.data || "Unrecognized axios error");
        } else {
          console.error("Unknown error", error);
        }
      });
  }, [dispatch, id, patients]);

  const patient = id ? patients[id] : undefined;

  if (!patient || !patient.ssn) {
    return null;
  }

  const getIcon = () => {
    let exhaustive: never;

    switch (patient.gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      case Gender.Other:
        return <>(Other)</>;
      default:
        exhaustive = patient.gender;
        return exhaustive;
    }
  };

  return (
    <div className="App" style={{ marginTop: "1em" }}>
      <Typography variant="h5" style={{ marginBottom: "0.5em" }}>
        <b>{patient.name}</b> {getIcon()}
      </Typography>
      <List style={{ fontSize: 18 }} dense={true}>
        <ListItem>DoB: {patient.dateOfBirth}</ListItem>
        <ListItem>SSN: {patient.ssn}</ListItem>
        <ListItem>Occupation: {patient.occupation}</ListItem>
      </List>
    </div>
  );
};

export default PatientPage;