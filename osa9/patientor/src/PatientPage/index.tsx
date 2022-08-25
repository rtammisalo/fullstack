import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Typography, List, ListItem, Button } from "@material-ui/core";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

import { useStateValue, updatePatient, addEntry } from "../state";
import { Entry, Gender, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import EntryList from "./EntryList";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    if (!id) return;

    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry, patients[id]));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  React.useEffect(() => {
    if (!id) return;

    const patient = patients[id];

    if (!patient || patient.ssn) return;

    axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
      .then(result => result.data)
      .then(updatedPatient =>
        dispatch(updatePatient(updatedPatient)))
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
      <EntryList entries={patient.entries} />
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;
