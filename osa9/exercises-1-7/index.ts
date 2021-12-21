import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    console.log(req.query)
    console.log(req.query)

    if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
        const height = Number(req.query.height)
        const weight = Number(req.query.weight)
        const bmi = calculateBmi(height, height)
        const ret = {
            weight,
            height,
            bmi
        }

        res.json(ret)
    } else {
        res.status(405).json({ error: "malformatted parameters" })
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});