import express from 'express';
import patientorService from '../services/patientorService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientorService.getNonSensitiveEntries());
});

export default router;
