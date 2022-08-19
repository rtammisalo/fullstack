interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

interface Rating {
  rating: number;
  ratingDescription: string;
}

const calculateRating = (average: number, target: number): Rating => {
  const differencePercent = Math.abs(average - target) / target;

  if (differencePercent < 0.3) {
    return { rating: 2, ratingDescription: 'not too bad but could be better' };
  }

  if (average < target) {
    return { rating: 1, ratingDescription: 'really bad, try harder' };
  }

  return { rating: 3, ratingDescription: 'good job!' };
};

export const calculateExercises = (
  trainingHours: Array<number>,
  target: number
): Result => {
  if (trainingHours.length === 0) throw new Error('No exercise days given');
  if (target < 0 || isNaN(target)) {
    throw new Error(
      'Target amount of daily hours should be a non-negative number'
    );
  }

  let trainingDays = 0;

  const total = trainingHours.reduce((sum: number, day: number) => {
    if (day < 0 || isNaN(day)) {
      throw new Error('Training hours should be non-negative numbers');
    }

    if (day > 0) trainingDays += 1;

    return sum + day;
  }, 0);

  const average = total / trainingHours.length;
  const success = average > target;
  const { rating, ratingDescription } = calculateRating(average, target);

  return {
    periodLength: trainingHours.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

interface parsedArguments {
  trainingHours: Array<number>;
  target: number;
}

const parseArguments = (args: Array<string>): parsedArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  const trainingHours = args.slice(3).map((s) => Number(s));

  return { trainingHours, target };
};

const start = () => {
  try {
    const { trainingHours, target } = parseArguments(process.argv);

    console.log(calculateExercises(trainingHours, target));
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error:', error.message);
    }
  }
};

if (process.argv.length > 2 && process.argv[1].includes('exerciseCalculator.ts')) {
  start();
}
