import express from 'express';
import bodyParser from 'body-parser';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(bodyParser.json()); // req.body is undefined without this

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const query = req.query;
  const height = Number(query.height);
  const weight = Number(query.weight);

  try {
    const bmi = calculateBmi(height, weight);
    res.json({ weight, height, bmi });
  } catch (error) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  const parsedTarget = Number(target);
  const parsedExercises = daily_exercises instanceof Array
    ? daily_exercises.map((day) => Number(day))
    : [NaN];

  if (parsedExercises.includes(NaN) || isNaN(parsedTarget)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  try {
    const result = calculateExercises(parsedExercises, parsedTarget);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
