import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patientsWithoutSsn = patientService.getAllWithoutSsn();

  res.json(patientsWithoutSsn);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const savedPatient = patientService.addPatient(newPatient);
    res.json(savedPatient);
  } catch (error) {
    let message = 'Failed to add new patient. ';

    if (error instanceof Error) {
      message += error.message;
    }

    res.status(400).send({ error: message });
  }
});

export default router;
