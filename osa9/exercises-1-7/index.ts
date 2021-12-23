import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
import bodyParser from 'body-parser';

import { calculateExercises, Stats } from './exerciseCalculator';

const app = express();
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    console.log(req.query);
    console.log(req.query);

    if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
        const height = Number(req.query.height);
        const weight = Number(req.query.weight);
        const bmi = calculateBmi(height, height);
        const ret = {
            weight,
            height,
            bmi
        };

        res.json(ret);
    } else {
        res.status(405).json({ error: "malformatted parameters" });
    }
});

interface ExercisesRequestProps {
  daily_exercises: Array<number>;
  target: number;
}

const verifyExercisesRequest = (req: Request): ExercisesRequestProps => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target} = req.body;

  if (!daily_exercises || !target) {
    throw new Error('parameters missing');
  }

  if (!Array.isArray(daily_exercises)
    || daily_exercises.some(v => typeof v !== 'number')
    ||  typeof target !== 'number') {
      throw new Error('malformatted parameters');
  }

  return {
    daily_exercises: daily_exercises as Array<number>,
    target: target
  };
};

app.post('/exercises', (req: Request, res: Response) => {
  try {
    const { daily_exercises, target } = verifyExercisesRequest(req);
    const result: Stats = calculateExercises(daily_exercises, target);
    res.json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.json({ error: error.message });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
