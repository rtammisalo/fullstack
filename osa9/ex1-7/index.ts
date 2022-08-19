import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

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

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
