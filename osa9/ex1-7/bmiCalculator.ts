export const calculateBmi = (height: number, weight: number): string => {
  const heightMeters = height / 100;

  if (heightMeters <= 0) throw new Error('Height cannot be zero or less');
  if (weight <= 0) throw new Error('Weight cannot be zero or less');
  if (isNaN(heightMeters)) throw new Error('Height has to be a number');
  if (isNaN(weight)) throw new Error('Weight has to be a number');

  const bmi = weight / heightMeters ** 2;

  if (bmi < 16.0) return 'Underweight (Severe thinness)';
  if (bmi <= 16.9) return 'Underweight (Moderate thinness)';
  if (bmi <= 18.4) return 'Underweight (Mild thinness)';
  if (bmi <= 24.9) return 'Normal (healthy weight)';
  if (bmi <= 29.9) return 'Overweight';
  if (bmi <= 34.9) return 'Obese (Class I)';
  if (bmi <= 39.9) return 'Obese (Class II)';

  return 'Obese (Class III)';
};

interface parsedArguments {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): parsedArguments => {
  if (args.length !== 4) throw new Error('Not enough arguments');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  return { height, weight };
};

const start = () => {
  try {
    const { height, weight } = parseArguments(process.argv);

    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error:', error.message);
    }
  }
};

if (process.argv.length > 2 && process.argv[1].includes('bmiCalculator.ts')) {
  start();
}
