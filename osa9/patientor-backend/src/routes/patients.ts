import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
  const patientsWithoutSsn = patientService.getAllWithoutSsn();

  res.json(patientsWithoutSsn);
});

router.post('/', (req, res) => {
  const newPatient = toNewPatient(req.body);
  const savedPatient = patientService.addPatient(newPatient);
  res.json(savedPatient);
});

export default router;
