import express from 'express';
import patientorService from '../services/patientorService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientorService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const id: string = req.params.id.toString();
  const patient = patientorService.getPatient(id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(400).send({ error: "not found"});
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientorService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send({ error: errorMessage });
    }
  });

export default router;
